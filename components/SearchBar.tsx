import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useStyles } from '../styles/index.style';

const hasQueryError = (query: string) => query.trim() === '';

const SearchBar: FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);
  const router = useRouter();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    setQueryError(hasQueryError(query));
  };

  const setSearchRoute = () => router.push(`/search?query=${query}`);

  const handleEnterSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !disabledQuery) {
      setSearchRoute();
    }
  };

  const handleClickSearch = () => {
    !disabledQuery && setSearchRoute();
  };

  const disabledQuery = queryError || query === ''; // initially query is empty and error is false

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltipError }}
      title={queryError ? 'Query must not be empty' : ''}
    >
      <TextField
        id="movie-search"
        variant="outlined"
        placeholder="Search a movie"
        value={query}
        onChange={handleTextChange}
        onKeyDown={handleEnterSearch}
        className={classes.textfield}
        error={queryError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                aria-label="search"
                onClick={handleClickSearch}
                disabled={disabledQuery}
              >
                <SearchIcon color={disabledQuery ? 'disabled' : 'primary'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};

export default SearchBar;
