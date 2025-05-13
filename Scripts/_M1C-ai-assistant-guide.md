# Working with AI Assistants: A Practical Guide

## Based on a Successful Document Creation Project

This guide draws from a productive collaboration creating a professional development plan for experienced statisticians. The principles apply broadly to working with AI assistants on complex projects.

## Core Principles for Effective AI Collaboration

### 1. Start with Clear Objectives
- Define what you want to create upfront
- Specify your target audience (e.g., "experienced statisticians with 10-15 years")
- Mention any constraints or requirements early

### 2. Provide Specific, Actionable Feedback
**Good Examples from Our Project:**
- "Move Bayesian Methods section down just before the Causal Inference section"
- "Change 'accessible' to 'prevalent' - the problem was never one of accessibility"
- "The tables in sections 2.2 and 2.3 have no vertical or horizontal lines"

**Why This Works:**
- Eliminates ambiguity
- Focuses on specific changes
- Provides clear direction

### 3. Iterate in Manageable Chunks
- Make 1-3 changes per request rather than many at once
- Review changes before moving to the next set
- Build incrementally toward your final goal

### 4. Provide Context and Reasoning
**Effective Approach:**
- "The Small Sample Performance line is misleading because..."
- "David Freedman started off a Bayesian but after some thought..."
- Include references and citations when relevant

**Benefits:**
- Helps AI understand the 'why' behind changes
- Improves accuracy of modifications
- Maintains document integrity

### 5. Correct Errors with Complete Information
**Example:**
- "Section 3.2 has to be re-written. The source is Bin Yu, not Bin Lu"
- Provided full reference: "B. Yu, & K. Kumbier, Veridical data science..."

**Best Practice:**
- Don't just point out errors - provide correct information
- Include sources when available
- Explain the significance of the correction

## Project-Specific Strategies

### For Document Creation/Editing
- Keep everything in one conversation thread
- Use the artifacts system to maintain versions
- Request a change log at the end
- Save/download final versions and CSS files

### For Technical Content
- Provide domain-specific context
- Clarify specialized terminology
- Share relevant frameworks (e.g., PQRS workflow)
- Include literature references

### For Formatting Issues
- Be specific about what's not working
- Describe how it should look
- Mention the output format (HTML, PDF, etc.)
- Specify any special requirements (tables, borders, spacing)

## When to Start New Conversations

### Continue in Same Thread:
- Working on the same document/project
- Making iterative improvements
- Building on previous context
- Tracking changes over time

### Start Fresh:
- Switching to unrelated topics
- Beginning new projects
- After major project completion
- If responses seem less coherent

## Best Practices Checklist

✓ **Before Starting:**
- [ ] Define clear objectives
- [ ] Gather necessary references/resources
- [ ] Know your output format requirements

✓ **During Collaboration:**
- [ ] Give specific, actionable feedback
- [ ] Provide context for changes
- [ ] Correct errors with complete information
- [ ] Review changes before proceeding
- [ ] Ask for clarification when needed

✓ **After Completion:**
- [ ] Request a summary or change log
- [ ] Download all artifacts
- [ ] Save important CSS/formatting files
- [ ] Document key decisions

## Communication Tips

### Effective Patterns:
1. **Direct Requests**: "Please add a second paragraph to..."
2. **Conditional Instructions**: "If you see X, then do Y"
3. **Examples**: "Something like this: [example text]"
4. **Clarifications**: "What I meant was..."

### What Works Well:
- Breaking complex requests into steps
- Providing before/after examples
- Referencing specific sections or line numbers
- Including sample text or formatting

## Working with Artifacts

### Key Points:
- Artifacts maintain document versions
- Multiple artifacts can exist (document + CSS)
- Always note artifact names for commands
- Download final versions for safekeeping

### Pandoc Commands:
Remember to save the conversion command:
```
pandoc -s input.md -c style.css -o output.html
```

## Final Recommendations

1. **Document Your Process**: Request change logs or summaries
2. **Be Patient with Iterations**: Multiple rounds often produce better results
3. **Leverage AI Strengths**: Use for structure, consistency, and rapid prototyping
4. **Maintain Human Oversight**: Always review and verify AI-generated content
5. **Learn from Each Interaction**: Note what works well for future projects

## Sample Interaction Flow

1. **Initial Request**: State objective clearly
2. **First Draft**: AI creates initial version
3. **Specific Feedback**: Point out needed changes
4. **Iterations**: Refine through specific requests
5. **Polish**: Address formatting and final details
6. **Documentation**: Request change log/summary
7. **Export**: Download all necessary files

---

*This guide is based on a successful collaboration creating a professional development plan for statisticians. The principles and practices outlined here contributed to an efficient and productive working relationship with the AI assistant.*