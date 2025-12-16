"use client";

import { QPAY_RESPONSE_MOCK } from "@/utils/qpay_response_mock";
import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Box,
  Link,
} from "@mui/material";

export default function ResultPage() {
  const [data] = useState(QPAY_RESPONSE_MOCK);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        gap: 3,
      }}
    >
      {/* --- TITLE --- */}
      <Typography variant="h6" fontWeight={600}>
        QPay төлбөр
      </Typography>

      {/* --- QR CARD --- */}
      <Card sx={{ width: "100%", textAlign: "center", p: 2 }}>
        <img
          src={`data:image/png;base64,${data.qr_image}`}
          alt="QPay QR"
          style={{ width: 220, height: 220 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          QR код уншуулж төлнө үү
        </Typography>
      </Card>

      {/* --- BANK / APP LIST --- */}
      <Grid container spacing={2}>
        {data.urls.map((u, index) => (
          <Grid item xs={6} key={index}>
            <Link href={u.link} underline="none" sx={{ display: "block" }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    src={u.logo}
                    alt={u.name}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />

                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {u.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {u.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
