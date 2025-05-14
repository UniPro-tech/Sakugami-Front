"use client";

import { TextField, Button, Paper, Box } from "@mui/material";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        padding: "20px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          bgcolor: "background.paper",
          animation: "fadeIn 0.5s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <h1
          className={notoSansJP.className}
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          ログイン
        </h1>
        <form>
          <TextField
            label="ユーザー名"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="パスワード"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              height: "48px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            ログイン
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
