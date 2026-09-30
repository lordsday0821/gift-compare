# gift-compare-legal

[anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal)의 플러그인 구조를 참고해 만든, gift-compare 서비스용 한국법 법무 검토 플러그인입니다.
**모든 산출물은 변호사 검토용 초안이며 법률 자문이 아닙니다.**

## 설치 (Claude Code)
```
/plugin marketplace add lordsday0821/gift-compare
/plugin install gift-compare-legal@gift-compare-legal
/gift-compare-legal:cold-start-interview
```

## Skills
| 명령 | 용도 |
|---|---|
| `cold-start-interview` | 서비스 현황 인터뷰 → `CLAUDE.md` 프로필 작성 (최초 1회 필수) |
| `crawling-review` | 크롤러 대상 사이트의 이용약관·robots.txt·저작권/DB권/업무방해 리스크 검토 |
| `privacy-review` | 개인정보 수집·처리방침·위탁·국외이전 검토 |
| `ad-disclosure-review` | 제휴 링크/광고 표시, 가격 비교 표현의 표시·광고법 검토 |
| `ecommerce-terms-review` | 이용약관, 통신판매업·중개 책임 고지 검토 |
| `contract-review` | 판매처 제휴/공급 계약, NDA 검토 및 에스컬레이션 |

## 구조
```
.claude-plugin/marketplace.json
gift-compare-legal/
  .claude-plugin/plugin.json
  CLAUDE.md          # 법무 프로필 (cold-start로 작성)
  skills/<name>/SKILL.md
  references/        # 자체 템플릿·플레이북 추가
```
