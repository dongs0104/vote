var mongoose = require("mongoose");
Schema = mongoose.Schema;

var SolutionSchema = new Schema({
    solutionType: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    reference: {
        type: String,
        require: true
    },
    _creator : {
        type: Schema.ObjectId,
        ref: 'Candidate'
    }
});

mongoose.model("Solution", SolutionSchema);
/*
* 솔루션 타입 정의
* 1 : 노동, 여성
* 2 : 보건, 복지
* 3 : 재정, 경제
* 4 : 환경, 문화, 관광
* 5 : 국방, 통일외교통상
* 6 : 교육, 과학기술, 정보통신
* 7 : 농림해양수산, 산업자원, 건설교통
* 8 : 정치, 행정자치, 사법윤리
* */
