import React, { useState } from "react";
import { Box, Typography, Paper, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import * as Icons from "@mui/icons-material";

interface SkillItemProps {
  name: string;
  title: string;
  description: string;
  rate: number;
}

const SkillPaper = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  borderRadius: "0.75rem",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 0px 10px rgba(0, 255, 255, 0.2)"
      : "0px 0px 5px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  position: "relative",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const RatingBox = styled(Box)({
  display: "flex",
  gap: "0.25rem",
});

const RatingSquare = styled(Box)(({ theme }) => ({
  width: "1rem",
  height: "1rem",
  borderRadius: "0.2rem",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.main,
  opacity: 0.3,
  transition: "opacity 0.3s ease-in-out",
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-2rem",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: "0.5rem",
  borderRadius: "0.5rem",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 0px 10px rgba(0, 255, 255, 0.3)"
      : "0px 0px 5px rgba(0, 0, 0, 0.1)",
  fontSize: "0.875rem",
  display: "none",
  whiteSpace: "nowrap",
}));

const SkillItem: React.FC<SkillItemProps> = ({ name, title, description, rate }) => {
  const [hover, setHover] = useState(false);

  // Map technology names to Material UI icons
  const iconMap: { [key: string]: React.ElementType } = {
    dotnetcore: Icons.LaptopMac,
    react: Icons.Code,
    mongodb: Icons.Storage,
    rabbitmq: Icons.SwapHoriz,
    mssql: Icons.DataObject,
    aws: Icons.Cloud,
    couchdb: Icons.Storage,
    restsoap: Icons.Http,
    dotnet: Icons.Laptop,
    "azure-devops": Icons.Build,
    csharp: Icons.Code,
    "aspnet-core": Icons.Web,
    azure: Icons.CloudCircle,
    "aspnet-mvc": Icons.WebAsset,
    dapper: Icons.DataObject,
    javascript: Icons.Code,
    "entity-framework": Icons.Storage,
  };

  const IconComponent = iconMap[name] || Icons.Code; // Default to CodeIcon

  return (
    <Tooltip title={description} arrow>
      <SkillPaper
        elevation={3}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <IconComponent sx={{ fontSize: "2rem", color: "primary.main" }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{title}</Typography>
          <RatingBox>
            {Array.from({ length: 10 }).map((_, i) => (
              <RatingSquare key={i} sx={{ opacity: i < rate ? 1 : 0.3 }} />
            ))}
          </RatingBox>
        </Box>
      </SkillPaper>
    </Tooltip>
  );
};

export default SkillItem;
