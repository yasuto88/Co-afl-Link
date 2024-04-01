import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Option from "@mui/joy/Option";

interface Props {
  // props here
}

const Search: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <Select
          size="sm"
          placeholder="参加状況"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">参加</Option>
          <Option value="pending">欠席</Option>
          <Option value="all">all</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <Select size="sm" placeholder="グループ">
          <Option value="group1">グループ1</Option>
          <Option value="group2">グループ2</Option>
          <Option value="group3">グループ3</Option>
          <Option value="group4">グループ4</Option>
          <Option value="all">all</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <Input
            size="sm"
            placeholder="名前を検索"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
    </React.Fragment>
  );
};

export default Search;
