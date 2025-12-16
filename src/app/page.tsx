"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Slider,
  Button,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { QPAY_RESPONSE_MOCK } from "@/utils/qpay_response_mock";

type Question = {
  id: number;
  question: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Би нойрны хэмнэлээ хадгалж, өглөө бүр сэргэг сэрж чадсан.",
  },
  {
    id: 2,
    question:
      "Долоо хоногт 3-аас доошгүй удаа идэвхтэй дасгал хөдөлгөөн хийсэн.",
  },
  {
    id: 3,
    question: "Стрессээ буруу зүйлээр биш, эрүүл аргаар тайлж хэвшсэн.",
  },
  {
    id: 4,
    question:
      "Туйлдталаа ядрахыг хүлээлгүй, амралтаа урьдчилан зохицуулж чадсан.",
  },
  {
    id: 5,
    question: "Сар бүрийн орлого, зарлагаа тодорхой хянаж, бүртгэж чадсан.",
  },
  {
    id: 6,
    question: "Сэтгэл хөдлөлөөр хийдэг хэрэгцээгүй худалдан авалтаа зогсоосон.",
  },
  { id: 7, question: "Ирээдүйдээ зориулсан хуримтлалд тогтмол мөнгө хийсэн." },
  {
    id: 8,
    question:
      "Санхүүгийн шийдвэрээ айдаст биш, зорилгодоо тулгуурлаж гаргасан.",
  },
  {
    id: 9,
    question: "Олон зүйл рүү үсчилгүй, 1-2 чухал зорилгодоо төвлөрсөн.",
  },
  {
    id: 10,
    question:
      "Зүгээр л 'завгүй' харагдах биш, бодитой үр дүн гаргаж ажилласан.",
  },
  {
    id: 11,
    question: "Өөрийн үнэ цэнийг өсгөх ур чадварт цаг гаргаж суралцсан.",
  },
  {
    id: 12,
    question: "Хэрэггүй зүйлд 'Үгүй' гэж хэлж, цаг заваа хамгаалж чадсан.",
  },
  {
    id: 13,
    question:
      "Ойр дотнын хүмүүстээ зөвхөн цаг төдийгүй чин сэтгэлээ зориулж чадсан.",
  },
  {
    id: 14,
    question: "Бусдад хил хязгаараа ойлгуулж, сөрөг харилцаанаас хол байсан.",
  },
  {
    id: 15,
    question:
      "Хүний ая талыг харах бус, өөрийн үнэт зүйлд нийцсэн шийдвэр гаргасан.",
  },
  {
    id: 16,
    question:
      "Алдаа гаргахдаа өөрийгөө шийтгэх биш, хурдан уучлан сэргэж чадсан.",
  },
];

const getColor = (value: number) => {
  switch (value) {
    case 1:
      return "#FF4D4F";
    case 2:
      return "#FFA500";
    case 3:
      return "#FFC107";
    case 4:
      return "#8BC34A";
    case 5:
      return "#4CAF50";
    default:
      return "#ccc";
  }
};

export default function SliderQuizPage() {
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const question = questions[current];

  const handleNext = () => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setValue(answers[questions[current + 1]?.id] || 3);
    } else {
      setCurrent(questions.length);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setValue(answers[questions[current - 1]?.id] || 3);
    }
  };

  const handleSubmit = () => {
    if (!email) {
      alert("Гmail хаягаа оруулна уу!");
      return;
    }
    console.log("Quiz Answers 👉", answers);
    console.log("User Email 👉", email);
    setSubmitted(true);
    alert("Таны хариулт амжилттай илгээгдлээ!");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      bgcolor="#f5f7fb"
    >
      <Card sx={{ width: "100%", maxWidth: 520, p: 3 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
          >
            {current < questions.length ? (
              <>
                <Typography variant="caption" color="text.secondary">
                  {current + 1} / {questions.length}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  mt={2}
                  mb={4}
                  textAlign="center"
                >
                  {question?.question}
                </Typography>

                <Slider
                  value={value}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  onChange={(_, v) => setValue(v as number)}
                  sx={{
                    mt: 3,
                    "& .MuiSlider-thumb": {
                      width: 30,
                      height: 30,
                      backgroundColor: getColor(value),
                    },
                    "& .MuiSlider-track": { backgroundColor: getColor(value) },
                    "& .MuiSlider-rail": { backgroundColor: "#ddd" },
                  }}
                />

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="#FF4D4F">
                    1
                  </Typography>
                  <Typography variant="body2" color="#FFA500">
                    2
                  </Typography>
                  <Typography variant="body2" color="#FFC107">
                    3
                  </Typography>
                  <Typography variant="body2" color="#8BC34A">
                    4
                  </Typography>
                  <Typography variant="body2" color="#4CAF50">
                    5
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2">Огт тэгээгүй</Typography>
                  <Typography variant="body2">Байнга тэгсэн</Typography>
                </Box>

                <Typography
                  mt={3}
                  textAlign="center"
                  color={getColor(value)}
                  fontWeight={600}
                >
                  Таны сонголт: {value}
                </Typography>

                <Box display="flex" justifyContent="space-between" mt={4}>
                  <Button onClick={handlePrev} disabled={current === 0}>
                    Өмнөх
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {current === questions.length - 1 ? "Дуусгах" : "Дараах"}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {!submitted ? (
                  <>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      textAlign="center"
                      mb={2}
                    >
                      Таны хариулт дууслаа! та хариуга авах 'gmail' хуудса
                      үлдээнэ үү!
                    </Typography>
                    <TextField
                      label="Gmail"
                      type="email"
                      fullWidth
                      variant="outlined"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      sx={{ mb: 3 }}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      хариу авах
                    </Button>
                  </>
                ) : (
                  <Typography variant="h6" textAlign="center" color="green">
                    Таны хариулт амжилттай илгээгдлээ!
                  </Typography>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </Box>
  );
}
