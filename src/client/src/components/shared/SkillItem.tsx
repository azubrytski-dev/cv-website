'use client';

import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import * as Icons from "@mui/icons-material";
import { getGlassSurfaceStyles } from "../../styles/glass.styles";

interface SkillItemProps {
  skillKey: string;
  title: string;
  description: string;
}

const IconMap: Record<string, React.ElementType> = {
  backend: Icons.Terminal,
  frontend: Icons.WebAsset,
  databases: Icons.Storage,
  cloud: Icons.Cloud,
  ai: Icons.SmartToy,
  dotnet: Icons.LaptopWindows,
  "aspnet-core": Icons.WebAsset,
  csharp: Icons.Code,
  python: Icons.Terminal,
  restsoap: Icons.Http,
  dapper: Icons.Schema,
  "entity-framework": Icons.AccountTree,
  rabbitmq: Icons.CompareArrows,
  react: Icons.Hub,
  nextjs: Icons.LaptopWindows,
  vuejs: Icons.WebAsset,
  javascript: Icons.Javascript,
  typescript: Icons.Code,
  postgresql: Icons.SdStorage,
  mongodb: Icons.Storage,
  redis: Icons.Storage,
  mssql: Icons.SdStorage,
  couchdb: Icons.Storage,
  aws: Icons.Cloud,
  azure: Icons.Cloud,
  "azure-devops": Icons.BuildCircle,
  "claude-code": Icons.Psychology,
  cursor: Icons.IntegrationInstructions,
  ollama: Icons.SmartToy,
  openspec: Icons.AutoAwesome,
  "llm-engineering": Icons.AutoAwesome,
  rag: Icons.Psychology,
  lora: Icons.AutoAwesome,
  agents: Icons.DeviceHub,
};

const SkillItem: React.FC<SkillItemProps> = ({ skillKey, title, description }) => {
  const theme = useTheme();
  const IconComponent = IconMap[skillKey] || Icons.Code;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem 1.1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-3px)",
        },
        ...getGlassSurfaceStyles(theme),
      }}
    >
      <Box
        sx={{
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "0.9rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0, 255, 255, 0.08)"
              : "rgba(25, 118, 210, 0.08)",
        }}
      >
        <IconComponent sx={{ fontSize: "1.7rem", color: "primary.main" }} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="h6" sx={{ lineHeight: 1.2, textAlign: "center" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.75, color: "text.secondary", textAlign: "left" }}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SkillItem;
