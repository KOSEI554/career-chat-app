package models

import (
    "encoding/json"
    "os"
)

// 職務経歴の構造体
type Experience struct {
    WorkHistory []struct {
        Company         string   `json:"company"`
        Position        string   `json:"position"`
        Period          string   `json:"period"`
        Responsibilities []string `json:"responsibilities"`
        Achievements    []string `json:"achievements"`
    } `json:"workHistory"`
}

// スキル情報の構造体
type Skills struct {
    TechnicalSkills struct {
        Languages  []string `json:"languages"`
        Frameworks []string `json:"frameworks"`
        Databases  []string `json:"databases"`
        Tools      []string `json:"tools"`
    } `json:"technicalSkills"`
    SoftSkills []string `json:"softSkills"`
}

// Q&Aパターンの構造体
type QAPatterns struct {
    Patterns []struct {
        Keywords []string `json:"keywords"`
        Response string   `json:"response"`
    } `json:"patterns"`
}

// JSONファイルを読み込む汎用関数
func LoadJSONData(filename string, v interface{}) error {
    // ioutilはGo 1.16から非推奨になったため、os.ReadFileを使用
    bytes, err := os.ReadFile(filename)
    if err != nil {
        return err
    }

    return json.Unmarshal(bytes, v)
}