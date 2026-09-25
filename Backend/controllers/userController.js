const getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: [],
  });
};

module.exports = {
  getUsers,
};
