package conversation

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// ConversationState represents the state of the conversation
type ConversationState struct {
	Messages    []*Message
	InputBuffer string
	Width       int
	Height      int
	Focused     bool
}

// Conversation represents the conversation interface
type Conversation struct {
	state ConversationState
	style lipgloss.Style
}

// NewConversation creates a new conversation instance
func NewConversation() *Conversation {
	return &Conversation{
		state: ConversationState{
			Messages:    []*Message{},
			InputBuffer: "",
			Width:       80,
			Height:      24,
			Focused:     true,
		},
		style: lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(lipgloss.Color("62")).
			Padding(1, 2),
	}
}

// Init initializes the conversation
func (c *Conversation) Init() tea.Cmd {
	// Add welcome message
	welcomeMsg := NewMessage("Hello! I'm your chatbot. How can I help you today?", "bot")
	c.state.Messages = append(c.state.Messages, welcomeMsg)
	return nil
}

// Update handles messages and updates the conversation state
func (c *Conversation) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmds []tea.Cmd

	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		c.state.Width = msg.Width
		c.state.Height = msg.Height

	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			return c, tea.Quit

		case "enter":
			if strings.TrimSpace(c.state.InputBuffer) != "" {
				// Add user message
				userMsg := NewMessage(c.state.InputBuffer, "user")
				c.state.Messages = append(c.state.Messages, userMsg)

				// Generate bot response
				botResponse := c.generateBotResponse(c.state.InputBuffer)
				botMsg := NewMessage(botResponse, "bot")
				c.state.Messages = append(c.state.Messages, botMsg)

				// Clear input buffer
				c.state.InputBuffer = ""
			}

		case "backspace":
			if len(c.state.InputBuffer) > 0 {
				c.state.InputBuffer = c.state.InputBuffer[:len(c.state.InputBuffer)-1]
			}

		default:
			// Add character to input buffer
			if len(msg.String()) == 1 {
				c.state.InputBuffer += msg.String()
			}
		}
	}

	return c, tea.Batch(cmds...)
}

// View renders the conversation interface
func (c *Conversation) View() string {
	// Calculate dimensions
	headerHeight := 3
	inputHeight := 3
	messagesHeight := c.state.Height - headerHeight - inputHeight

	// Render header
	header := c.renderHeader()

	// Render messages
	messages := c.renderMessages(messagesHeight)

	// Render input
	input := c.renderInput()

	// Combine all components
	layout := lipgloss.JoinVertical(
		lipgloss.Left,
		header,
		messages,
		input,
	)

	return c.style.Render(layout)
}

// renderHeader renders the conversation header
func (c *Conversation) renderHeader() string {
	headerStyle := lipgloss.NewStyle().
		Bold(true).
		Foreground(lipgloss.Color("205")).
		Align(lipgloss.Center).
		Width(c.state.Width - 4)

	return headerStyle.Render("💬 Chat Bot Conversation")
}

// renderMessages renders the message history
func (c *Conversation) renderMessages(height int) string {
	if len(c.state.Messages) == 0 {
		return lipgloss.NewStyle().
			Height(height).
			Align(lipgloss.Center).
			Foreground(lipgloss.Color("240")).
			Render("No messages yet...")
	}

	var messageViews []string
	for _, msg := range c.state.Messages {
		messageViews = append(messageViews, c.renderMessage(msg))
	}

	// Join messages with newlines
	messages := strings.Join(messageViews, "\n")

	// Create scrollable area
	scrollStyle := lipgloss.NewStyle().
		Height(height).
		Width(c.state.Width - 4)

	return scrollStyle.Render(messages)
}

// renderMessage renders a single message
func (c *Conversation) renderMessage(msg *Message) string {
	var style lipgloss.Style
	var prefix string

	if msg.Sender == "user" {
		style = lipgloss.NewStyle().
			Foreground(lipgloss.Color("39")).
			Align(lipgloss.Right)
		prefix = "You: "
	} else {
		style = lipgloss.NewStyle().
			Foreground(lipgloss.Color("118")).
			Align(lipgloss.Left)
		prefix = "Bot: "
	}

	// Format timestamp
	timestamp := msg.Timestamp.Format("15:04")
	content := prefix + msg.Content + " (" + timestamp + ")"

	return style.Render(content)
}

// renderInput renders the input field
func (c *Conversation) renderInput() string {
	inputStyle := lipgloss.NewStyle().
		Foreground(lipgloss.Color("255")).
		Background(lipgloss.Color("236"))

	prompt := "> "
	input := prompt + c.state.InputBuffer + "_"

	return inputStyle.Render(input)
}

// generateBotResponse generates a simple bot response
func (c *Conversation) generateBotResponse(userInput string) string {
	input := strings.ToLower(strings.TrimSpace(userInput))

	// Simple response logic
	switch {
	case strings.Contains(input, "hello") || strings.Contains(input, "hi"):
		return "Hello! Nice to meet you!"
	case strings.Contains(input, "how are you"):
		return "I'm doing great, thank you for asking! How are you?"
	case strings.Contains(input, "what is your name"):
		return "I'm a simple chatbot created to chat with you in the terminal!"
	case strings.Contains(input, "help"):
		return "I can chat with you! Try asking me about my name, how I'm doing, or just say hello!"
	case strings.Contains(input, "bye") || strings.Contains(input, "goodbye"):
		return "Goodbye! It was nice chatting with you!"
	case strings.Contains(input, "thank"):
		return "You're welcome! I'm happy to help!"
	default:
		return "That's interesting! Tell me more about that."
	}
}
