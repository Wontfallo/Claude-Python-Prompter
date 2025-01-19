import sys
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                            QTextEdit, QLabel, QPushButton, QMessageBox)
from PyQt6.QtCore import Qt
import pyperclip  # For copying to clipboard

class PromptBuilder(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Python Prompt Builder")
        self.setMinimumSize(800, 600)

        # Create central widget and layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # Task Description input
        layout.addWidget(QLabel("Task Description:"))
        self.task_input = QTextEdit()
        self.task_input.setPlaceholderText("Enter your task description here...")
        layout.addWidget(self.task_input)

        # Additional Requirements input
        layout.addWidget(QLabel("Additional Requirements (optional):"))
        self.requirements_input = QTextEdit()
        self.requirements_input.setPlaceholderText("Enter any additional requirements...")
        layout.addWidget(self.requirements_input)

        # Output area
        layout.addWidget(QLabel("Generated Prompt:"))
        self.output_area = QTextEdit()
        self.output_area.setReadOnly(True)
        layout.addWidget(self.output_area)

        # Buttons
        self.generate_button = QPushButton("Generate Prompt")
        self.generate_button.clicked.connect(self.generate_prompt)
        layout.addWidget(self.generate_button)

        self.copy_button = QPushButton("Copy to Clipboard")
        self.copy_button.clicked.connect(self.copy_to_clipboard)
        layout.addWidget(self.copy_button)

    def generate_prompt(self):
        task = self.task_input.toPlainText()
        requirements = self.requirements_input.toPlainText()

        if not task:
            QMessageBox.warning(self, "Input Required", "Please provide a task description")
            return

        prompt = f"You are an expert Python programmer tasked with creating a full, working Python program for a local Windows application. Your goal is to provide a comprehensive, error-free script or set of module scripts that can be directly implemented by the user. Please carefully read and follow these instructions:\n\n1. Task Description:\n<task_description>\n{task}\n</task_description>\n\n2. Additional Requirements:\n<additional_requirements>\n{requirements}\n</additional_requirements>\n\n3. Analysis and Implementation:\nBefore writing the code, please analyze the task thoroughly. Write your implementation plan inside <implementation_plan> tags. Include the following in your plan:\n- List out potential libraries and their purposes\n- High-level program structure (single script or multiple modules)\n- Key functions or classes needed, with brief descriptions\n- Potential optimizations for the specified hardware\n- Any areas where you need more information or clarification\n\n4. Code Implementation:\nAfter your implementation plan, provide the full working Python script(s) that accomplish the described task. Follow these guidelines:\na. Always provide the entire working script, not just snippets.\nb. If the script is too long or complex, break it into separate modules. Provide a clear directory structure and explain how to organize the files.\nc. Include necessary imports at the beginning of each script.\nd. Use appropriate error handling and input validation where necessary.\ne. Add comments to explain complex parts of the code.\nf. If you need clarification about any part of the existing codebase or libraries, explicitly ask for that information.\n\n5. Output Format:\nPresent your solution in the following format:\n\n```markdown\n## Program Structure\n[If using multiple modules, provide a directory tree diagram here]\n\n## Python Script(s)\n[Provide full Python scripts here with correct syntax highlighting]\n\n## Setup Instructions\n[Provide any necessary setup or installation instructions here]\n\n## Additional Notes\n[Include any additional notes, explanations, or suggestions here]\n```\n\n6. Additional Considerations:\n- Suggest any third-party libraries or tools that could be helpful for the task.\n- If another programming language would be better suited or a helpful supplement, mention it and explain why.\n- If the task can benefit from GPU acceleration, include code to utilize the RTX 4090 GPU.\n- Tailor the script to work optimally on the specified hardware (Windows 11, Overclocked and custom cooled Intel i-9-14900k 24 threads CPU, Nvidia RTX4090 24GB VRAM GPU, 96 GB DDR5 6400 MT/s RAM, 4TB NVMe SSD read/writes > 12GB/s).\n\nRemember to provide the entire working script, especially when making edits or changes. Think critically about the task and suggest any tools or approaches that could enhance the solution without overcomplicating it. Start simple and work up to more complex solutions if necessary.\n\nIf you need any clarification or additional information at any point, please ask specific questions rather than making assumptions."

        self.output_area.setPlainText(prompt)

    def copy_to_clipboard(self):
        if self.output_area.toPlainText():
            pyperclip.copy(self.output_area.toPlainText())
            QMessageBox.information(self, "Success", "Prompt copied to clipboard!")
        else:
            QMessageBox.warning(self, "No Content", "Generate a prompt first!")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = PromptBuilder()
    window.show()
    sys.exit(app.exec())