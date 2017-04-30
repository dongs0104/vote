var Solution = require("mongoose").model("Solution");
var Candidate = require("mongoose").model("Candidate");

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
    console.log(req.body);
    solution.save(function(err) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            r["result"] = 0;
            var c = Candidate.findByIdAndUpdate(
                new require("mongoose").Types.ObjectId(req.body._creator),
                {$push: {solutions : solution._id}},
                {safe: true, upsert: true, new : true},
                function(){}
            );
            console.log(c);

            res.status(200).json(r);
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
exports.read = function(req, res, next) {
    var r = new Object();

    Solution.findById(req.params._id, function(err, user) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            if(user != null) {
                r["result"] = 0;
                r["user"] = user;
                res.status(200).json(r);
            } else {
                r["result"] = 1;
                res.status(404).json(r);
            }
        }
    });
};

/**
 * [update / 사용자 정보 수정 함수]
 * [Description]
 * 데이터베이스에 저장된 사용자 계정 정보를 수정한다.
 *
 * 1. 수정에 성공할 경우
 * HTTP Status Code : 200
 * JSON 변수 r { result : 0, user : UserSchema }
 *
 * 2. 수정에 실패할 경우
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
 *  # user : 수정한 사용자 정보 (UserSchema)
 */
exports.update = function(req, res, next) {
    var u = new User(req.body);
    var r = new Object();

    Solution.findByIdAndUpdate(u._id, u, function(err, user) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            if(user != null) {
                r["result"] = 0;
                r["user"] = u;
                res.status(200).json(r);
            } else {
                r["result"] = 1;
                res.status(404).json(r);
            }
        }
    });
};

/**
 * [delete / 사용자 정보 삭제 함수]
 * [Description]
 * 데이터베이스에 저장된 사용자 계정 정보를 삭제한다.
 *
 * 1. 삭제에 성공할 경우
 * HTTP Status Code : 200
 * JSON 변수 r { result : 0 }
 *
 * 2. 삭제에 실패할 경우
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
 */
exports.delete = function(req, res, next) {
    var r = new Object();

    User.findByIdAndRemove(req.params._id, function(err) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            r["result"] = 0;
            res.status(200).json(r);
        }
    });
};

/**
 * 	Other User Function
 */
