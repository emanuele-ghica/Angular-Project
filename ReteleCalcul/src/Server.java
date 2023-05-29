import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server started and listening on port 5000...");

            // Wait for a client to connect
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected: " + clientSocket.getInetAddress().getHostAddress());

            // Create input and output streams for communication
            BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter writer = new PrintWriter(clientSocket.getOutputStream(), true);

            // Questions and answers
            String[] questions = {
                    "Question 1: What is the capital of France?",
                    "Question 2: Who is the author of 'To Kill a Mockingbird'?",
                    "Question 3: What is the chemical symbol for gold?",
                    "Question 4: Which planet is known as the 'Red Planet'?",
                    "Question 5: Who painted the Mona Lisa?",
                    "Question 6: What is the world's largest ocean?",
                    "Question 7: Who wrote the play 'Romeo and Juliet'?",
                    "Question 8: Which country is known as the 'Land of the Rising Sun'?",
                    "Question 9: What is the tallest mountain in the world?",
                    "Question 10: What is the square root of 144?"
            };

            String[] answers = {
                    "Paris",
                    "Harper Lee",
                    "Au",
                    "Mars",
                    "Leonardo da Vinci",
                    "Pacific Ocean",
                    "William Shakespeare",
                    "Japan",
                    "Mount Everest",
                    "12"
            };

            // Send questions and check answers
            int totalQuestions = questions.length;
            int currentQuestion = 0;
            int currentAmount = 5000;
            String clientResponse;

            while (currentQuestion < totalQuestions) {
                String question = questions[currentQuestion];
                String answer = answers[currentQuestion];

                // Send question and amount to the client
                writer.println("Current amount to be won: $" + currentAmount);
                writer.println(question);


                System.out.println("The correct answer to question " + (currentQuestion + 1)  + " is: " + answer);
                // Receive client's answer
                clientResponse = reader.readLine();


                // Check the answer
                if (clientResponse.equalsIgnoreCase(answer)) {
                    // Correct answer
                    writer.println("Correct!");
                    currentQuestion++;

                    // Check if it's the last question
                    if (currentQuestion == totalQuestions) {
                        writer.println("Congratulations! You won the quiz and $5,120,000!");
                    } else {
                        // Prompt for the next action
                        writer.println("Enter 'quit' to take the money or press Enter to continue.");
                        String action = reader.readLine();

                        if (action.equalsIgnoreCase("quit")) {
                            writer.println("You quit the quiz. You won $" + currentAmount);
                            break;
                        }

                        // Double the amount for the next question
                        currentAmount *= 2;
                    }
                } else {
                    // Incorrect answer
                    writer.println("Wrong answer! You lost the quiz.");
                    break;
                }
            }

            // Close the connection
            reader.close();
            writer.close();
            clientSocket.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
