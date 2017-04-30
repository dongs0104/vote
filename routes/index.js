var candidate = require("../controllers/candidate");
var solution = require("../controllers/solution");
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    /**
     *  User CRUD Routes
     */
    app.route("/candidate").post(candidate.create);//임시
    app.route("/candidate/update/:_name").put(candidate.update);//후보자 투표율 증가

    app.route("/solution").post(solution.create);//임시 투표 검증 데이터
    app.route("/solution/:_type").get(solution.create);//투표자 랜덤 데이터 Via type

    /**
     * 	Other User Method Routes
     */
};
