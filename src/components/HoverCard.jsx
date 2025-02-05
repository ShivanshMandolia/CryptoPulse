import { Card, CardContent, Typography } from "@mui/material";

const HoverCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">Hover over me!</Typography>
        <Typography variant="body2">This card has a hover effect.</Typography>
      </CardContent>
    </Card>
  );
};

export default HoverCard;
