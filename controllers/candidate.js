var Candidate = require("mongoose").model("Candidate");
var ipaddr = require("ipaddr.js");
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
    var candidate = new Candidate(req.body);
    var r = new Object();
    candidate.save(function(err) {
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
    var r = new Object();
    var ipString = req.connection.remoteAddress;
    if (ipaddr.IPv4.isValid(ipString)) {
        ipString = ipString;
    } else if (ipaddr.IPv6.isValid(ipString)) {
        var ip = ipaddr.IPv6.parse(ipString);
        if (ip.isIPv4MappedAddress()) {
            ipString = ip.toIPv4Address().toString();

        } else {
            // ipString is IPv6
        }
    } else {
        // ipString is invalid
    }

    if(ipString == '127.0.0.1'){
        console.log(req.params._id);
        Candidate.findByIdAndUpdate({_id:req.params._id},{$inc:{voted:1}} , function(err, result) {
            if(err) {
                r["result"] = 1;
                res.status(400).json(r);
                return next(err);
            } else {
                if(result != null) {
                    r["result"] = 0;
                    res.status(200).json(r);
                } else {
                    r["result"] = 1;
                    res.status(404).json(r);
                }
            }
        });
    }
    else{
        r["result"] = 1;
        res.status(400).json(r);
    }


};
exports.readAll = function(req, res, next) {
    var r = new Object();

    Candidate.find({}, function(err, candidate) {
        if(err) {
            r["result"] = 1;
            res.status(400).json(r);
            return next(err);
        } else {
            if(candidate != null) {
                res.status(200).json(candidate);
            } else {
                r["result"] = 1;
                res.status(404).json(r);
            }
        }
    });
};


/*
Candidate.findByIdAndUpdate(

    {$push: {"messages": {title: title, msg: msg}}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
)
*/
