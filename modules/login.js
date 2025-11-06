export function login(username) {
  return new Promise((resolve, reject) => {
    if (username === "admin") {
      resolve(username);
    } else {
      reject("Username salah!");
    }
  });
}
