package handlers

import (
	"career-chat-app/models"
	"net/http"
	"sort"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

// QAパターンの構造体
type QAPattern struct {
    Keywords []string
    Response string
}

// QAパターン集
type QAPatterns struct {
    Patterns []QAPattern
}

// プロフィールデータ
var profileData models.Profile

// QAパターンのデータ
var qaPatterns = QAPatterns{
    Patterns: []QAPattern{
        {
            Keywords: []string{"スキル", "できること", "技術"},
            Response: "私のスキルセットには、Go、JavaScript、Reactなどがあります。",
        },
        {
            Keywords: []string{"経歴", "職歴", "仕事"},
            Response: "私はこれまで複数の企業でソフトウェアエンジニアとして働いてきました。",
        },
        // 必要に応じて他のパターンを追加
    },
}

// マッチ結果の構造体
type MatchResult struct {
    Response string
    Score    int
}

// HandleChat はチャットのリクエストを処理します
func HandleChat(c echo.Context) error {
    message := c.QueryParam("message")
    if message == "" {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "メッセージが指定されていません"})
    }
    
    response := findResponse(message)
    return c.JSON(http.StatusOK, map[string]string{"response": response})
}

func findResponse(message string) string {
    message = strings.ToLower(message)
    var matches []MatchResult
    
    // 各パターンに対してスコアを計算
    for _, pattern := range qaPatterns.Patterns {
        score := 0
        for _, keyword := range pattern.Keywords {
            if strings.Contains(message, keyword) {
                score++
            }
        }
        if score > 0 {
            matches = append(matches, MatchResult{
                Response: pattern.Response,
                Score:    score,
            })
        }
    }
    
    // スコアでソート
    if len(matches) > 0 {
        sort.Slice(matches, func(i, j int) bool {
            return matches[i].Score > matches[j].Score
        })
        return matches[0].Response
    }
    
    // 特定のキーワードに基づいた動的な回答
    if strings.Contains(message, "名前") || strings.Contains(message, "お名前") {
        return "私の名前は" + profileData.Name + "です。"
    }
    
    if strings.Contains(message, "経験年数") || strings.Contains(message, "何年") {
        return "エンジニアとしての経験は" + strconv.Itoa(profileData.YearsOfExperience) + "年です。"
    }
    
    return "申し訳ありません。その質問についての回答が見つかりませんでした。"
}

// プロフィールデータを初期化する関数
func InitProfileData(profile models.Profile) {
    profileData = profile
}