PennController.ResetPrefix(null);
var showProgressBar = false;

var underline_blank = {
  outline: "none",
  resize: "none",
  border: "0",
  padding: "0",
  margin: "0",
  "margin-left": "1ex",
  "margin-right": "1ex",
  "vertical-align": "-.33em",
  "background-color": "white",
  "border-bottom": "2px solid black",
  display: "inline",
};

var responseCss = {
  width: "600px",
  height: "100px",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "1em",
};

var pageCss = {
  overflow: "auto",
  padding: "1em",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "2em",
};

var textCss = {
  "text-align": "center",
  margin: "0 auto",
  // "width": "50em"
};

var buttonCss = {
  "background-color": "#E03A3E",
  color: "white",
  "font-size": "1.25em",
  padding: "0.5em",
  "border-radius": "0.25em",
  // "width": "4em",
  margin: "0 auto",
  "text-align": "center",
  border: "none", // Remove default button border
  display: "block", // To center the button
};

Header(
  newVar("sonaID").global(),
  newVar("id").global(),
  newVar("name").global(),
  newVar("email").global(),
  newVar("age").global(),
  newVar("language").global(),
  newVar("q0Response").global(),
  newVar("q1Response").global(),
  newVar("q2Response").global(),
  newVar("q3Response").global()
)
  .log("sonaID", GetURLParameter("id"))
  .log("id", getVar("id"))
  .log("name", getVar("name"))
  .log("email", getVar("email"))
  .log("age", getVar("age"))
  .log("language", getVar("language"))
  .log("q0Response", getVar("q0Response"))
  .log("q1Response", getVar("q1Response"))
  .log("q2Response", getVar("q2Response"))
  .log("q3Response", getVar("q3Response"));

newTrial(
  "debrief",
  newText(
    "thanks",
    "<p>Thanks for participating! " +
      "Please take a couple of minutes to answer following questions, read a short debriefing about the experiment on the next page, and provide us your information to get a class credit on the last page." +
      "When you're done, click the red button to submit your results. " +
      "<i>Failure to submit this form will result in you not being able get credit for your course. " +
      "All of this information is stored independently of your experiment and cannot be used to identify you.</i> </p>"
  ).css(textCss),
  newText("q0", "1. Did you have enough time to answer the questions?").css(
    textCss
  ),
  newTextInput("q0Response").css(responseCss).log(),
  newText(
    "q1",
    "2. Do you feel that you have any idea what the experiment was about? If so, what do you think it was about?"
  ).css(textCss),
  newTextInput("q1Response").css(responseCss).log(),
  newText(
    "q2",
    "3. Did you find yourself using a particular strategy (or strategies) to answer the questions? If so, what was your strategy?"
  ).css(textCss),
  newTextInput("q2Response").css(responseCss).log(),
  newText(
    "q3",
    "4. Were there any patterns in the experiment that were particularly noticeable?"
  ).css(textCss),
  newTextInput("q3Response").css(responseCss).log(),
  newCanvas("page0", 1500, 980)
    .add(100, 20, newImage("umdling0", "umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("thanks"))
    .add(0, 270, getText("q0"))
    .add(0, 310, getTextInput("q0Response"))
    .add(0, 450, getText("q1"))
    .add(0, 490, getTextInput("q1Response"))
    .add(0, 630, getText("q2"))
    .add(0, 670, getTextInput("q2Response"))
    .add(0, 810, getText("q3"))
    .add(0, 850, getTextInput("q3Response"))
    .cssContainer(pageCss)
    .print(),
  newText("space0", "<p>").print(),
  newButton("next0", "NEXT")
    .bold()
    .css(buttonCss)
    .print()
    .wait(
      getTextInput("q0Response")
        .testNot.text("")
        .failure(
          newText("q0answer", "Please provide an answer for the first question")
            .settings.color("red")
            .print()
        )
        .and(
          getTextInput("q1Response")
            .testNot.text("")
            .failure(
              newText(
                "q1answer",
                "Please provide an answer for the second question"
              )
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("q2Response")
            .testNot.text("")
            .failure(
              newText(
                "q2answer",
                "Please provide an answer for the second question"
              )
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("q3Response")
            .testNot.text("")
            .failure(
              newText(
                "q3answer",
                "Please provide an answer for the third question"
              )
                .settings.color("red")
                .print()
            )
        )
    ),
  getVar("q0Response").set(getTextInput("q0Response")),
  getVar("q1Response").set(getTextInput("q1Response")),
  getVar("q2Response").set(getTextInput("q2Response")),
  getVar("q3Response").set(getTextInput("q3Response")),
  getVar("id").set("null"),
  getVar("name").set("null"),
  getVar("email").set("null"),
  getVar("age").set("null"),
  getVar("language").set("null")
);

newTrial("debrief2",
  newText(
    "intro",
    "<p> Thank you for participating in our study! In this experiment, we explored how people choose between expressions like 'must,' 'have to,' 'probably,' and 'will' in different situations. We were particularly interested in how these choices reflect the conclusions people draw based on different types of reasoning. Specifically, we are investigating how people use the word 'must' compared to other expressions to convey conclusions across various reasoning contexts.</p>" + 
    "<p>The scenarios you encountered represented three kinds of reasoning: deductive reasoning (where a conclusion necessarily follows from the evidence), inductive reasoning (generalizing based on observed pattern), and abductive reasoning (where a conclusion is inferred as the most likely explanation for an observation). These types of reasoning involve different levels of certainty, and we are examining how the expressions people prefer to use align with the level of certainty conveyed. By analyzing your choices, we aim to better understand how “must” is used when drawing inferences in everyday language.</p>"
  ).css(textCss),
  newText(
    "contact",
    "<p> If you are interested in learning more about this study, please contact the experimenter at <a href='mailto:sboukend@umd.edu'>sboukend@umd.edu</a>. "
  ).css(textCss),
  newCanvas("page", 1500, 500)
    .add(100, 20, newImage("UCSC-Logo", "umd_ling.png").size("60%", "auto"))
    .add(0, 120, getText("intro"))
    .add(0, 400, getText("contact"))
    .cssContainer(pageCss)
    .print(),
  newText("space", "<p>").print(),
  newButton("next", "NEXT").bold().css(buttonCss).print().wait(),
  getVar("q0Response").set("null"),
  getVar("q1Response").set("null"),
  getVar("q2Response").set("null"),
  getVar("q3Response").set("null"),
  getVar("id").set("null"),
  getVar("name").set("null"),
  getVar("email").set("null"),
  getVar("age").set("null"),
  getVar("language").set("null")
);

newTrial("debrief3",
  newTextInput("id")
    .before(newText("ID", "Student UID: ").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("name")
    .before(newText("name", "Name and Surname: ").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("email")
    .before(newText("mail", "UMD email: ").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("age")
    .before(newText("AGE", "Age:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("language")
    .before(newText("LANG", "Native language:").size("15em", "1.5em"))
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newTextInput("otherlg")
    .before(
      newText("Other languages you speak (please list):").size("15em", "1.5em")
    )
    .size("15em", "1.5em")
    .lines(1)
    .css(underline_blank)
    .log(),
  newCanvas("page2", "500px", 330)
    .add(100, 20, newImage("umdling2", "umd_ling.png").size("60%", "auto"))
    .add(0, 150, getTextInput("id"))
    .add(0, 180, getTextInput("name"))
    .add(0, 210, getTextInput("email"))
    .add(0, 240, getTextInput("age"))
    .add(0, 270, getTextInput("language"))
    .add(0, 300, getTextInput("otherlg"))
    .cssContainer(pageCss)
    .print(),
  newText("space2", "<p>").print(),
  newButton("submit", "SUBMIT")
    .bold()
    .css(buttonCss)
    .print()
    .wait(
      getTextInput("age")
        .test.text(/^\d+$/)
        .failure(
          newText("Age should be a numberic value")
            .settings.color("red")
            .print()
        )
        .and(
          getTextInput("language")
            .testNot.text("")
            .failure(
              newText("Please enter your languages you speak fluently")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("id")
            .testNot.text("")
            .failure(
              newText("Please Enter your UMD Student ID")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("name")
            .testNot.text("")
            .failure(
              newText("Please Enter your name and surname")
                .settings.color("red")
                .print()
            )
        )
        .and(
          getTextInput("name")
            .testNot.text("")
            .failure(
              newText("Please Enter your e-mail address")
                .settings.color("red")
                .print()
            )
        )
    ),
  getVar("q0Response").set("null"),
  getVar("q1Response").set("null"),
  getVar("q2Response").set("null"),
  getVar("q3Response").set("null"),
  getVar("id").set(getTextInput("id")),
  getVar("name").set(getTextInput("name")),
  getVar("email").set(getTextInput("email")),
  getVar("age").set(getTextInput("age")),
  getVar("language").set(getTextInput("language"))
);
