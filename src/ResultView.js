import React from "react";
import moment from "moment";
export default class ResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.result;
  }
  updateBody(bodyContent) {
    // console.log(this.state.body_content.raw);
    if (this.state.url.raw.includes("kakao")) {
      var r =  this.state.body_content.raw;
      // if (r.search("◆ 직원 유형") == -1) {
      //   r = r.substring(r.search("◆ 조직소개"));
      // } else {
      //   r = r.substring(r.search("직원유형"));
      // }
      r = r.substring(r.search("직원유형"));
      r = r.substring(0, r.search("회사정보"));
      var idx_last_tag = r.lastIndexOf("#");
      var after_tag = r.substring(idx_last_tag)
      ;
      r = r.substring(0, idx_last_tag + after_tag.search("[(]"));
      // r = r.substr(0, r.search("([0-9].)"));
      
      r = r.replaceAll("&#x2F;", "/");
      r = r.replaceAll("&quot;", "\"");
      r = r.replaceAll(/[^\w\s‘'[\]"ㄱ-ㅎㅏ-ㅣ가-힣0-9~,+()◆※#.<>\-:/]/gi, '<br>');
      const endsStrs = ["직원 유형", "영입인원", "조직소개", "업무내용", "자격조건", "우대조건", "우대사항", "지원프로세스", "직군 태그", "필독사항", "지원자격"];
      endsStrs.forEach(s => {
        r = r.replaceAll("◆ " + s, s);
        r = r.replaceAll("[" + s + "]", s);
        r = r.replaceAll(s, '<br><b>◆ ' + s + '</b><br>');
      }
      );
      const firstStrs = ["◆", "<<", "[", "(", "팀 문화", "클라우드포털" ];
      firstStrs.forEach(s => {
        r = r.replaceAll(s, '<br><br>' + s);
      }
      );
      this.state.body_content.changed = r;

      var o = this.state.url.raw;
      if (o.includes("TECHNOLOGY")) {
        this.state.jobClass = "💻테크";
      } else if (o.includes("BUSINESS_SERVICES")) {
        this.state.jobClass = "🧸서비스비즈";
      } else if (o.includes("DESIGN/BRAND_MARKETING")) {
        this.state.jobClass = "🖥디자인/브랜드";
      } else if (o.includes("STAFF")) {
        this.state.jobClass = "🔮스태프";
      }
      this.state.image_url = "https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/news/d3d3eb87017f00001.png?type=thumb&opt=C630x472";
      o = this.state.title.snippet;
      this.state.title.changed = o.substring(o.search("/ ")+2);
      // console.log(this.state.title.changed);
    }
    else if (this.state.url.raw.includes("naver")) {

      r =  this.state.body_content.raw;
      r = r.substring(r.search("[[]"));
      r = r.substring(0, r.lastIndexOf("지원하기"));
      
      
      r = r.replaceAll("&#x2F;", "/");
      r = r.replaceAll("&quot;", "\"");
      
      r = r.replaceAll(/[^\w\s@‘'[\]"ㄱ-ㅎㅏ-ㅣ가-힣0-9~,+()▶◆※#.<>\-:/]/gi, '<br>');
      const endsStrs = ["업무내용", "필요역량", "지원자격/우대사항", "채용조건", "역할", "근무지", "자격요건", "역할", "조직소개", "조직 소개", "학력사항", "필수사항", "우대사항", "지원자격/ 우대사항", "채용하고 싶은 사람", "자격 요건" ];
      endsStrs.forEach(s => {
        r = r.replaceAll("[" + s + " ]", '<br><b>◆ ' + s + '</b><br>');
        r = r.replaceAll("[ " + s + "]", '<br><b>◆ ' + s + '</b><br>');
        r = r.replaceAll("[ " + s + " ]", '<br><b>◆ ' + s + '</b><br>');
        r = r.replaceAll("[" + s + "]", '<br><b>◆ ' + s + '</b><br>');
        r = r.replaceAll("<br> " + s , '<br><b>◆ ' + s + '</b><br>');
      }
      );
      const boldStrs = ["전형절차 및 기타사항", "1. 전형절차", "2. 기타사항", "기술역량", "1 전형절차", "2 기타사항", "등록일", "모집 Position", "직무 소개", "이런 분들을 환영합니다", "Growth Committee", "담당 서비스 소개", "담당업무", "필요한 역량"];
      boldStrs.forEach(s=> {
        r = r.replaceAll(s, '<br><b>◆ ' + s + '</b><br>');
      });
      const firstStrs = ["D-", "[", "◆ ", " -", " . ", "※"];
      firstStrs.forEach(s => {
        r = r.replaceAll(s, '<br>' + s);
      }
      );
      r = r.replaceAll("채용 공고 홈 이전 공고 보기 다음 공고 보기", "");
      this.state.body_content.changed = r;
      
      
      o = this.state.url.raw;
      if (o.includes("developer")) {
        this.state.jobClass = "💻개발자";
      } else if (o.includes("designer")) {
        this.state.jobClass = "🖥설계(디자인)";
      } else if (o.includes("contents")) {
        this.state.jobClass = "🧸콘텐츠&서비스";
      } else if (o.includes("management")) {
        this.state.jobClass = "🔮경영지원";
      }
      o = this.state.body_content.raw;
      this.state.title.changed = o.substring(o.search("검색")+2, o.search("채용 공고"));
      this.state.image_url = "https://play-lh.googleusercontent.com/Kbu0747Cx3rpzHcSbtM1zDriGFG74zVbtkPmVnOKpmLCS59l7IuKD5M3MKbaq_nEaZM";
    }

    else if (this.state.url.raw.includes("linecorp")) {

      r =  this.state.body_content.raw;
      r = r.substring(r.search("Corporate ") + 10, r.search("목록 보기"));
      r = r.replaceAll("&#x2F;", "/");
      r = r.replaceAll("&quot;", "\"");
      
      r = r.replaceAll(/[^\w\s@‘'[\]"ㄱ-ㅎㅏ-ㅣ가-힣!%0-9~,+()▶◆※#.<>\-:/]/gi, '<br>');
      const boldStrs = ["담당업무", "자격요건", "우대사항", "전형안내", "근무제도", " 근무형태 ", "근무지", " 근무시간", "기타", "보훈 취업지원 대상 및 장애인 서류 제출 안내"
    , "본 포지션과 직군에 대한 더 많은 스토리를 만나보세요!"];
      boldStrs.forEach(s=> {
        r = r.replaceAll(s, '<br><b>◆ ' + s + '</b><br>');
      });
      const firstStrs = ["D-", "[", "◆ ", " . ", ];
      firstStrs.forEach(s => {
        r = r.replaceAll(s, '<br>' + s);
      }
      );
      r = r.replaceAll("Line Facebook Twitter Link ", "<br><br>");
      this.state.body_content.changed = r;
      o = this.state.body_content.changed;
      o = o.substring(0, o.search("<br><br>"));
      if (o.includes("Engineering")) {
        this.state.jobClass = "💻Engineering";
      } else if (o.includes("Design")) {
        this.state.jobClass = "🖥Design";
      } else if (o.includes("Product")) {
        this.state.jobClass = "🧸Product Planning";
      } else if (o.includes("Business")) {
        this.state.jobClass = "✨Business&Sales";
      } else if (o.includes("Marketing")) {
        this.state.jobClass = "🎁Marketing&Comms";
      } else if (o.includes("Corporate")) {
        this.state.jobClass = "🔮Corporate";
      }
      this.state.image_url = "https://d.line-scdn.net/n/_s1/_0/linecorp-web-uit/images/line_icon_200_v3.jpg";

      o = this.state.title.snippet;
      this.state.title.changed = o.substring(o.search("RS") + 5);
    }
    // this.state.title.changed = "🔗" + this.state.title.snippet;
    // console.log(this.state.body_content.changed);
  }
  render() {
    // console.log(this.state);
    this.updateBody();
    // console.log(moment()
    // .subtract(12, "hours")
    // .toISOString());
    // console.log(this.state);
    return (
      
      <li className="sui-result">
        
        <div className="sui-result__header">
          
        </div>
        <div className="sui-result__body">
          <ul className="sui-result__details">
          <a href={this.state.url.raw} target="_blank" rel="noreferrer">
          <li>
          <img
              src={this.state.image_url}
              alt="thumb"
              
              style={{
                // display: "block",
                maxHeight: "1.3em",
                maxWidth: "1.3em",
                padding: 0,
                margin: 0,
                // height: "100%",
                objectFit: "center",
                objectPosition: "100% 100%"
                
              }}
            />
          <span
            className="sui-result__title"
            // Snippeted results contain search term highlights with html and are
            // 100% safe and santitized, so we dangerously set them here
            dangerouslySetInnerHTML={{ __html: this.state.title.changed }}
          />
          </li>
        
          
          <li>
            <span
              className="sui-result__value"
              dangerouslySetInnerHTML={{
                __html: " 🔗원문 링크<br>" + this.state.jobClass +"<br>📨"+  this.state.last_crawled_at.raw.substring(0, 10)
              }}
            />
          </li>
          </a>
          <details>
            <summary><span
            className="sui-result__value"
            dangerouslySetInnerHTML={{
              __html: "내용 보기"
              // this.state.body_content.snippet.substring(this.state.body_content.snippet.search("다음 공고 보기")+8)
            }}
            />
            </summary>
            <li>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: this.state.body_content.changed
                }}
              />
            </li>
          </details>
          </ul>
        </div>
      </li>
    );
  }
}
