package models

type Profile struct {
    Name             string `json:"name"`
    CurrentRole      string `json:"currentRole"`
    YearsOfExperience int    `json:"yearsOfExperience"`
    Location         string `json:"location"`
}
