const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate userId
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userObjectId = new Types.ObjectId(userId);

    // Aggregate total income
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$userId", totalIncome: { $sum: "$amount" } } },
    ]);

    // Aggregate total expense
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$userId", totalExpense: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeResult[0]?.totalIncome || 0;
    const totalExpense = totalExpenseResult[0]?.totalExpense || 0;

    // All income transactions
    const allIncomeTransactions = await Income.find({
      userId: userObjectId
    }).sort({ date: -1 });

    // Calculate total income
    const incomeTotal = allIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 30 days expense transactions
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Calculate total expense in last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Fetch recent transactions - last 5 incomes and last 5 expenses
    const recentIncomeTransactions = (await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)).map((txn) => ({
      ...txn.toObject(),
      type: "income",
    }));

    const recentExpenseTransactions = (await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)).map((txn) => ({
      ...txn.toObject(),
      type: "expense",
    }));

    // Merge and sort recent transactions by date descending
    const lastTransactions = [...recentIncomeTransactions, ...recentExpenseTransactions].sort(
      (a, b) => b.date - a.date
    );

    // Send response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      allIncome: {
        total: incomeTotal,
        transactions: allIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};