var Solution = require("mongoose").model("Solution");
var Candidate = require("mongoose").model("Candidate");
var ObjectId = require("mongoose").Types.ObjectId;
/**
 * 	User CRUD Function
 */

/**
 * [create / 사용자 정보 생성 함수]
 * [Description]
 * 임시 함수
 * 후보자의 정보를 데이터베이스에 저장한다.
 *
 * 1. 저장에 성공할 경우
 * HTTP Status Code : 200
 * JSON 변수 r { result : 0 }
 *
 * 2. 저장에 실패할 경우
 * HTTP Status Code : 400
 * JSON 변수 r { result : 1 }
 *
 * < Param >
 * @param {UserSchema} user [생성할 사용자 정보]
 * @param {Object} r [어플리케이션으로 반환할 JSON 변수]
 *
 * < Return >
 * @return {JSON} Object변수인 r을 반환
 *  # result : 함수 실행 결과 (1 : 에러 / 0 : 정상)
 *  임시로 사용할 내용
 */
exports.create = function(req, res, next) {
    var solution = new Solution(req.body);
    var r = new Object();
    solution.save(function(err) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            r["result"] = 0;
            Candidate.findByIdAndUpdate(
                ObjectId(req.body._creator),
                {$push: {solutions : solution._id}},
                {safe: true, upsert: true, new : true},
                function(){}
            );
            res.status(200).json(r).redirect('/');
        }
    });
};

/**
 * [read / 사용자 정보 조회 함수]
 * [Description]
 * 데이터베이스에 저장된 사용자 계정 정보를 조회한다.
 *
 * 1. 조회에 성공할 경우
 * HTTP Status Code : 200
 * JSON 변수 r { result : 0, user : UserSchema }
 *
 * 2. 조회에 실패할 경우
 * HTTP Status Code : 400
 * JSON 변수 r { result : 1 }
 *
 *
 * < Param >
 * @param {Object} r [어플리케이션으로 반환할 JSON 변수]
 *
 * < Return >
 * @return {JSON} Object 변수인 r을 반환
 *  # result : 함수 실행 결과 (1 : 에러 / 0 : 정상)
 *  # user : 조회한 사용자 정보 (UserSchema)
 */
exports.search = function(req, res, next) {
    var r = new Object();

    var query = [{ $match: {solutionType : parseInt(req.params._type)}}, { $sample: {size: 5}}];
    Solution.aggregate(query,
        function(err,solutions) {
            if(err) {
                r["result"] = 1;
                res.status(400).json(r);
                return next(err);
            } else {
                if(solutions != null) {
                    r["result"] = 0;
                    r["solutions"] = solutions;
                    res.status(200).json(r);
                } else {
                    r["result"] = 1;
                    res.status(404).json(r);
                }
            }
        }
    );
};



exports.readAll = function(req, res, next) {
    var r = new Object();

    Solution.find({}, function(err, solutions) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            if(solutions != null) {
                res.status(200).json(solutions);
            } else {
                res.status(404).json(r);
            }
        }
    });
};

exports.delete = function(req, res, next) {
    var r = new Object();

    Solution.findOneAndRemove({content:"?"}, function(err, solutions) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            if(solutions != null) {
                console.log(solutions);
                Candidate.findByIdAndUpdate(
                    ObjectId(solutions._creator),
                    {$pop: {solutions : solutions._id}},
                    {safe: true, upsert: true, new : true},
                    function(){});
                r["result"] = 0;

                res.status(200).json(solutions);
            }
        }
    });
};
exports.itemList = function(req, res, next) {
    var r = new Object();
    var list = ['군복무 기간을 줄이는 것에 대해서 어떻게 생각하세요?',
        '사드 배치 문제로 시끄러운데 이는 번복할 수 있는 문제라고 생각하세요?',
        '여성들이 조금 더 고위직에 진출하는 것에 대해서 어떻게 생각하세요?',
        '부모 양쪽의 육아 휴직에 대해서 어떻게 생각하시나요?',
        '4차 산업혁명과 같은 미래산업들을 정부가 선도하는 것에 대해서 어떻게 생각하시나요?',
        '국내의 미세먼지 기준이 WTO(세계보건기수) 보다 수준이 낮습니다. 이에 대해서 어떻게 생각하시나요?',
        '국가 재난 발생 시 재난 대응은 어떤 방식으로 하는 편이 좋겠는가?',
        '원전 폐쇄에 대해서 어떻게 생각하시나요?',
        '성소수자에 대해서 어떻게 생각하시나요?',
        '검찰개혁을 위해 검찰의 수사권이나 기소권 제한과 같은 조치가 필요하다고 생각하시나요?',
        '건강보험의 보장성과 공공성을 강화에 대해서 어떻게 생각하시나요?',
        '박근혜 전 대통령의 특별사면에 찬성하십니까?',
        '남북 관계 개선을 위해 2016년 2월 가동이 중단된 개성공단의 재가동의 필요하다고 생각하시나요?',
        '기업이 거둔 소득에 대해 부가되는 법인세는 현재기준으로 200억을 넘게 버는 기업은 22%를 내고 있습니다. 이에 대해서 어떻게 생각하시나요?',
        '우리나라 4대 재벌들에게 주어졌던 특권과 혜택을 없애야한다고 생각하십니까?',
        '국가의 검증을 받은 단일한 역사관 교육이 필요하다고 생각하십니까?',
        '2015년 12월 28일 한일위안부합의에 대해서 재협상에 대해서 어떻게 생각하십니까?',
        '입시위주의 교육을 극복하기 위해서 학제 개편을 하여 직업교육을 강화하는 방향으로 가야할까요?',
        '시간당 최저임금에 대해서 어떻게 생각하시나요?',
        '시간당 최저임금에 대해서 어떻게 생각하시나요?'
    ];
    for (var i = 0; i < list.length; i++) {
        r[i] = list[i];
    }
    res.status(200).json(r);

};