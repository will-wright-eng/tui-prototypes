package conversation

import "time"

// Message represents a single message in the conversation
type Message struct {
	ID        string
	Content   string
	Sender    string // "user" or "bot"
	Timestamp time.Time
}

// NewMessage creates a new message
func NewMessage(content, sender string) *Message {
	return &Message{
		ID:        generateID(),
		Content:   content,
		Sender:    sender,
		Timestamp: time.Now(),
	}
}

// generateID creates a simple ID for the message
func generateID() string {
	return time.Now().Format("20060102150405")
}
