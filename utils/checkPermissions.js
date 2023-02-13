const checkPermissions = (requestUser, resourceUserId) => {
    if(requestUser.role === "admin")return;
    if(requestUser.userId === resourceUserId.toString())return;
    console.log("unauthrized to access this route");
    // throw new CustomError.UnauthorizedError(
    //     "Not authorized to access this route"
    //   );
}

export default checkPermissions;