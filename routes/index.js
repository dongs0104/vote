var candidate = require("../controllers/candidate");
var solution = require("../controllers/solution");
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', {"types" : ['노동, 여성', '보건, 복지', '재정, 경제', '환경, 문화, 관광', '국방, 통일외교통상', '교육, 과학기술, 정보통신', '농림해양수산, 산업자원, 건설교통', '정치, 행정자치, 사법윤리']});
    });
    /**
     *  User CRUD Routes
     */
    app.route("/candidate").post(candidate.create);//임시
    app.route("/candidate/update/:_name").put(candidate.update);//후보자 투표율 증가
    app.route("/candidates").get(candidate.readAll);//후보자 투표율 증가
    app.route("/solution").post(solution.create);//임시 투표 검증 데이터
    app.route("/solution/:_type").get(solution.search);//투표자 랜덤 데이터 Via type
    app.route("/solutions").get(solution.readAll);//투표 데이터
    /**
     * 	Other User Method Routes
     */
    app.route("/solution").delete(solution.delete);//투표 데이터
};
