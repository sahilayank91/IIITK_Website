window.IS_DEVELOPER_MODE = true;

window.CONFIG = {
    originURL: window.IS_DEVELOPER_MODE ? "http://localhost:3000" : "",
    authenticateURL: {
        login: "service/authenticate/login",
        logout: "service/authenticate/logout",
        register: "service/authenticate/register",
        forgotPassword: "service/authenticate/forgotPassword",
        resetPassword: "service/authenticate/resetPassword",
        authenticate: "service/authenticate/auth"
    },
    batchURL:{
        addBatch: "service/batch/addBatch",
        updateBatch: "service/batch/updateBatch",
        deleteBatch: "service/batch/deleteBatch",
        getBatchList: "service/batch/getBatchList"
    }
};
