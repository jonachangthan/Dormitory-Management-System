const db = require("../model/database");
//const token = require("token.js");
const readBulletin = require("../model/bulletinRead");
const readMessage = require("../model/messageRead");
const bcrypt = require("bcryptjs");

exports.search = (req, res) => {
  const { UserName, Permission } = req.body;

  // Build the condition part of the SQL query
  let condition = ""; // Initialize the condition string

  // Check if the UserName condition exists
  if (UserName) {
    condition += `UserName = '${UserName}'`; // Add the UserName condition
  }

  // Check if the Permission condition exists
  if (Permission !== "選擇身分") {
    if (condition !== "") {
      condition += " AND "; // Add the AND operator if an UserName condition already exists
    }
    condition += `Permission = '${Permission}'`; // Add the Permission condition
  }

  // Check if both account and permission conditions are empty
  if (!UserName && Permission == "選擇身分") {
    condition = "1"; // Assign a condition that always evaluates to true to retrieve all accounts
  }

  // Build the complete SQL query
  const sql = `SELECT * FROM account WHERE ${condition}`;

  db.query(sql, (error, results) => {
    if (error || results.length == 0) {
      res.render("modify_account", {
        err_message: "查無此人",
      });
    } else {
      results.forEach((element) => {
        if (element.Permission == 0) {
          s ="學生";
        } else if (element.Permission == 1) {
          s = "管理員";
        } else if (element.Permission == 2) {
          s = "舍監";
        }
        element.html = s;
      });
      return res.render("modify_account", {
        message: results,
        searchSQL: sql,
      });
    }
  });
};

exports.addStudent = (req, res) => {
  const student = {
    S_ID: req.body.S_ID,
    S_Department: req.body.S_Department,
    S_Name: req.body.S_Name,
    S_Academic_Year: req.body.S_Academic,
    S_Email: req.body.S_Email,
    S_Phone: req.body.S_Phone,
    S_Sex: req.body.S_Sex,
  };

  const accountSql = `SELECT * FROM account WHERE UserName = '${student.S_ID}'`;

  db.query(accountSql, (error, results) => {
    if (error || !Number.isInteger(student.S_Academic_Year)) {
      return res.render("add_student_account", {
        err_message: "新增帳號失敗"
      });
    }

    if (results.length > 0) {
      // Account already exists
      return res.render("add_student_account", {
        err_message: "帳號已存在",
      });
    }

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt
    const hashedPassword = bcrypt.hashSync(student.S_ID, salt); // default password is S_ID

    const insertAccountSql = `INSERT INTO account (UserName, Password, Permission)
                                VALUES ('${student.S_ID}', '${hashedPassword}', '0')`;

    db.query(insertAccountSql, (error) => {
      if (error) {
        return res.render("add_student_account", {
          err_message: "新增帳號失敗",
        });
      }

      const insertStudentSql = `INSERT INTO student (S_ID, S_Department, S_Name, S_Academic_Year, S_Email, S_Phone, S_Sex, S_Dormitory_No, S_Building_No) 
                                  VALUES ('${student.S_ID}', '${student.S_Department}', '${student.S_Name}', ${student.S_Academic_Year}, 
                                  '${student.S_Email}', '${student.S_Phone}', '${student.S_Sex}', NULL, NULL)`;

      db.query(insertStudentSql, (error, results) => {
        if (error) {
          return res.render("add_student_account", {
            err_message: "新增學生失敗",
          });
        }

        db.query(
          `SELECT * FROM student WHERE S_ID = '${student.S_ID}'`,
          (error, results) => {
            if (error) {
              return res.render("add_student_account", {
                err_message: "查詢學生資料失敗",
              });
            } else {
              return res.render("add_student_account", {
                message: results,
              });
            }
          }
        );
      });
    });
  });
};

exports.addManager = (req, res) => {
  const manager = {
    M_ID: req.body.id,
    M_Name: req.body.name,
    M_Email: req.body.email,
    M_Phone: req.body.phone,
  };

  // Build the SQL query to check if the account already exists
  const checkSql = `SELECT * FROM account WHERE UserName = '${manager.M_ID}'`;

  db.query(checkSql, (error, results) => {
    if (error) {
      return res.render("add_manager_account", {
        err_message: "新增帳號失敗",
      });
    }

    if (results.length > 0) {
      return res.render("add_manager_account", {
        err_message: "帳號已存在",
      });
    }

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt
    const hashedPassword = bcrypt.hashSync(manager.M_ID, salt); // default password is M_ID

    // Build the SQL query to append the account to the account table
    const accountSql = `INSERT INTO account (UserName, Password, Permission)
                          VALUES ('${manager.M_ID}', '${hashedPassword}', '1')`;

    db.query(accountSql, (error) => {
      if (error) {
        return res.render("add_manager_account", {
          err_message: "新增帳號失敗",
        });
      }

      // Build the SQL query to append the manager to the manager table
      const managerSql = `INSERT INTO manager (M_ID, M_Name, M_Email, M_Phone) 
                              VALUES ('${manager.M_ID}', '${manager.M_Name}', '${manager.M_Email}', '${manager.M_Phone}')`;

      db.query(managerSql, (error) => {
        if (error) {
          return res.render("add_manager_account", {
            err_message: "新增管理員失敗",
          });
        }

        db.query(
          `SELECT * FROM manager WHERE M_ID = '${manager.M_ID}'`,
          (error, results) => {
            if (error) {
              return res.render("add_manager_account", {
                err_message: "查詢管理員資料失敗",
              });
            } else {
              return res.render("add_manager_account", {
                message: results,
              });
            }
          }
        );
      });
    });
  });
};

exports.addSupervisor = (req, res) => {
  const supervisor = {
    M_ID: req.body.supervisorId,
    M_Name: req.body.supervisorName,
    M_Email: req.body.email,
    M_Phone: req.body.phone,
  };

  // Build the SQL query to check if the account already exists
  const checkSql = `SELECT * FROM account WHERE UserName = '${supervisor.M_ID}'`;

  db.query(checkSql, (error, results) => {
    if (error) {
      return res.render("add_supervisor_account", {
        err_message: "新增帳號失敗",
      });
    }

    if (results.length > 0) {
      return res.render("add_supervisor_account", {
        err_message: "帳號已存在",
      });
    }

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt
    const hashedPassword = bcrypt.hashSync(supervisor.M_ID, salt); // default password is M_ID

    // Build the SQL query to append the account to the account table
    const accountSql = `INSERT INTO account (UserName, Password, Permission)
                          VALUES ('${supervisor.M_ID}', '${hashedPassword}', '2')`;

    db.query(accountSql, (error) => {
      if (error) {
        return res.render("add_supervisor_account", {
          err_message: "新增帳號失敗",
        });
      }

      // Build the SQL query to append the supervisor to the supervisor table
      const supervisorSql = `INSERT INTO manager (M_ID, M_Name, M_Email, M_Phone) 
                              VALUES ('${supervisor.M_ID}', '${supervisor.M_Name}', '${supervisor.M_Email}', '${supervisor.M_Phone}')`;

      db.query(supervisorSql, (error) => {
        if (error) {
          return res.render("add_supervisor_account", {
            err_message: "新增舍監失敗",
          });
        }

        db.query(
          `SELECT * FROM manager WHERE M_ID = '${supervisor.M_ID}'`,
          (error, results) => {
            if (error) {
              return res.render("add_supervisor_account", {
                err_message: "查詢舍監資料失敗",
              });
            } else {
              return res.render("add_supervisor_account", {
                message: results,
              });
            }
          }
        );
      });
    });
  });
};

exports.delete = (req, res) => {
    const username = req.body.UserName;
    const searchSQL = req.body.sql;

    // Build the SQL query to delete the account
    const deleteSql = `DELETE FROM account WHERE UserName = '${username}'`;

    db.query(deleteSql, (error) => {
        if (error) {
            return res.render("modify_account", {
                err_message: "刪除帳號失敗",
            });
        } else {
            db.query(searchSQL, (error, results) => {
                results.forEach((element) => {
                    if (element.Permission == 0) {
                      s ="學生";
                    } else if (element.Permission == 1) {
                      s = "管理員";
                    } else if (element.Permission == 2) {
                      s = "舍監";
                    }
                    element.html = s;
                });
                return res.render("modify_account", {
                    message: results,
                    sql : searchSQL
                });
            });
        }
    });
};