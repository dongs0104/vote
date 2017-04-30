var Candidate = require("../controllers/Candidate");

module.exports = function(app) {

    /**
     *  User CRUD Routes
     */
    app.route("/candidate").post(Candidate.create);//임시
    app.route("/users/:_id").get(Candidate.read);//테스트용
    app.route("/users").put(Candidate.update);//후보자 투표율 증가

    /**
     * 	Other User Method Routes
     */
};
