export const Queries = {
  registerInfoQuery: "SELECT * FROM users WHERE email = ?",
  InsertIntoUsersQuery:
    "INSERT INTO users(`firstName`, `lastName`,`email`, `password`, `phoneNumber`, `gender`, `location`, `occupation`, `profilePic`) VALUES (?)",
  loginInfoQuery: "SELECT * FROM users WHERE email = ?",
  getUserQuery: "SELECT * FROM users WHERE id = ?",
  getAllUserQuery: "SELECT * FROM users",
  getUserFollowedQuery:
    "SELECT f.followedId, `firstName`, `lastName`, `occupation`, `gender`, `profilePic` FROM users u JOIN friendship f ON f.followedId = u.id WHERE followerId = ?",
  getUserFollowerQuery:
    "SELECT f.followerId, `firstName`, `lastName`, `occupation`, `gender`, `profilePic` FROM users u JOIN friendship f ON f.followerId = u.id WHERE followedId = ?",
  removeFollowedQuery:
    "DELETE FROM friendship WHERE `followedId` = ? AND `followerId` = ?",
  addFollowedQuery:
    "INSERT INTO friendship (`followedId`, `followerId`) VALUES (?)",
  createPostQuery:
    "INSERT INTO posts (`uid`, `date`, `description`, `picturePath`) VALUES(?)",
  getFeedPostsQuery: `SELECT p.*, firstName, lastName, gender, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.uid) 
    LEFT JOIN friendship AS r ON (p.uid = r.followedId) WHERE r.followerId = ? OR p.uid = ? ORDER BY p.id DESC`,
  getUserPostsQuery: `SELECT p.*, firstName, lastName, gender, profilePic FROM posts AS p LEFT JOIN users AS u ON (u.id = p.uid) WHERE u.id = ?`,
  getLikesQuery: "SELECT uid from likes WHERE pid = ?",
  removeLikeQeury: "DELETE FROM likes WHERE `uid` = ? AND `pid` = ?",
  addLikeQeury: "INSERT INTO likes (`uid`, `pid`) VALUES(?)",
  getCommentsQuery: `SELECT c.*, firstName, lastName, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.uid) WHERE c.pid = ?`,
  addCommentQuery:
    "INSERT INTO comments (`pid`, `uid`, `content`, `date`) VALUES(?)",
};
