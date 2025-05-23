"use client";
import * as React from "react";
import { usePathname, useParams } from "next/navigation";
import { DashboardLayout, SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  Account,
  AccountPopoverFooter,
  AccountPreview,
  AccountPreviewProps,
  SignOutButton,
} from "@toolpad/core";
import {
  Stack,
  Typography,
  MenuList,
  MenuItem,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack
      direction="column"
      p={0}
    >
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

// TODO: Replace with actual icons
// TODO: Replace with actual handlers
// TODO: Replace with actual labels
const personalSettingItems = [
  {
    label: "Profile",
    icon: <Avatar />,
    onClick: () => {
      // Handle profile click
    },
  },
  {
    label: "Settings",
    icon: <Avatar />,
    onClick: () => {
      // Handle settings click
    },
  },
  {
    label: "Help",
    icon: <Avatar />,
    onClick: () => {
      // Handle help click
    },
  },
];

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography
        variant="h6"
        mx={2}
        mt={1}
      >
        Personal Settings
      </Typography>
      <MenuList>
        {personalSettingItems.map((item) => (
          <MenuItem
            key={item.label}
            component="button"
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              columnGap: 2,
              textAlign: "left",
            }}
            onClick={item.onClick}
          >
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return (
      <AccountSidebarPreview
        {...props}
        mini={mini}
      />
    );
  }
  return PreviewComponent;
};

const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default function Layout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const [segments] = params.segments ?? [];

  const title = React.useMemo(() => {
    switch (pathname.split("/")[1]) {
      case "employees":
        if (pathname === "/employees/new") {
          return "New Employee";
        }
        if (segments && pathname.includes("/edit")) {
          return `Employee ${segments} - Edit`;
        }
        if (segments) {
          return `Employee ${segments}`;
        }
        return undefined;
      case "projects":
        if (pathname === "/projects/new") {
          return "New Project";
        }
        if (segments && pathname.includes("/edit")) {
          return `Project ${segments} - Edit`;
        }
        if (segments) {
          return `Project ${segments}`;
        }
        return undefined;
    }
  }, [segments, pathname]);

  return (
    <DashboardLayout slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}>
      <PageContainer title={title}>{props.children}</PageContainer>
    </DashboardLayout>
  );
}
