import React, { useEffect, useState } from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { filterState } from "@/state/atoms/filterState";
import { userState } from "@/state/atoms/user";

interface Props {
  // props here
}

const Search: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("");
  const [group, setGroup] = useState("");
  const [filter, setFilter] = useRecoilState(filterState);
  const user = useRecoilValue(userState);
  const [universities, setUniversities] = useState<string[]>([]);
  const [groups, setGroups] = useState<(string | undefined)[]>([]);

  const handleSearch = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSearch(newValue || "");
    setFilter((prev) => ({
      ...prev,
      name: newValue || "",
    }));
  };

  const handleUniversity = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setUniversity(newValue || "");
    setFilter((prev) => ({
      ...prev,
      universityName: newValue || "",
    }));
  };

  const handleGroup = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setGroup(newValue || "");
    setFilter((prev) => ({
      ...prev,
      groupName: newValue || "",
    }));
  };

  useEffect(() => {
    const universityName = [...new Set(user?.map((u) => u.university_name))];
    setUniversities(universityName);

    const groupName = [...new Set(user?.map((u) => u.group_id))];
    setGroups(groupName);
  }, [user]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <Select size="sm" placeholder="グループ" onChange={handleGroup}>
          {groups.map((group, index) => (
            <Option key={index} value={group}>
              {group}
            </Option>
          ))}
          <Option value="">all</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <Select
          size="sm"
          placeholder="大学"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={handleUniversity}
        >
          {universities.map((university, index) => (
            <Option key={index} value={university}>
              {university}
            </Option>
          ))}
          <Option value="">all</Option>
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
          placeholder="名前を検索"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          onChange={(event) => handleSearch(event, event.target.value)}
          id="search"
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
            onChange={(event) => handleSearch(event, event.target.value)}
            id="search"
          />
        </FormControl>
        {renderFilters()}
      </Box>
    </React.Fragment>
  );
};

export default Search;
