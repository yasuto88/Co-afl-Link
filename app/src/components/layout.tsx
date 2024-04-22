import { Box, Sheet } from "@mui/joy";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Header />
      
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <Sheet
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 4 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
            overflowY: "auto", // スクロールを許可
            gap: 1,
          }}
        >
          {children}
        </Sheet>
      </Box>
    </Box>
  );
}
