import { useReducer } from 'react'
import { Music_Context } from '.'
import {
  ALBUM_FILTER,
  ARTIST_FILTER,
  LANGUAGE_FILTER,
  ALL_ALBUMS,
  ALL_ARTISTS,
  ALL_USERS,
  UPDATE_ROLE,
  USER_LOGIN,
  CATOGERY_FILTER,
  SAVE_ALBUM,
  SAVE_ARTIST,
  SAVE_SONG,
  SONG_LENGTH,
  ALL_SONGS,
  DELETE_ALBUM,
  DELETE_ARTIST,
  DELETE_SONG,
  SET_ISPALYING,
  SET_PALYING_INDEX
} from './action'
import { MusicReducer } from './reducer'

const initialState = {
  user: {},
  allUsers: [],
  allAlbums: [],
  allArtists: [],
  allSongs: [],
  albumFiter: {},
  artistFilter: {},
  catogeryFilter: {},
  languageFilter: {},
  Playing: false,
  PlayingIndex: null
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MusicReducer, initialState)
  const UserLogin = user => {
    dispatch({ type: USER_LOGIN, payload: user })
  }
  const GetAllUsers = users => {
    dispatch({ type: ALL_USERS, payload: users })
  }
  const UpdateUserRole = (user, index) => {
    dispatch({ type: UPDATE_ROLE, payload: user, index })
  }
  const GetAlbums = albums => {
    dispatch({ type: ALL_ALBUMS, payload: albums })
  }
  const GetArtists = artists => {
    dispatch({ type: ALL_ARTISTS, payload: artists })
  }
  const AlbumFilter = album => {
    dispatch({ type: ALBUM_FILTER, payload: album })
  }

  const ArtistFilter = Artist => {
    dispatch({ type: ARTIST_FILTER, payload: Artist })
  }

  const LanguageFilter = lang => {
    dispatch({ type: LANGUAGE_FILTER, payload: lang })
  }

  const CatogeryFilter = catogery => {
    dispatch({ type: CATOGERY_FILTER, payload: catogery })
  }
  const AlbumSave = data => {
    dispatch({ type: SAVE_ALBUM, payload: data })
  }

  const ArtistSave = data => {
    dispatch({ type: SAVE_ARTIST, payload: data })
  }

  const SongSave = data => {
    dispatch({ type: SAVE_SONG, payload: data })
  }

  const SetAllSongs = data => {
    dispatch({ type: ALL_SONGS, payload: data })
  }

  const AlbumDeleted = id => {
    dispatch({ type: DELETE_ALBUM, payload: id })
  }
  const ArtistDeleted = id => {
    dispatch({ type: DELETE_ARTIST, payload: id })
  }
  const SongDeleted = id => {
    dispatch({ type: DELETE_SONG, payload: id })
  }

  const SetPlaying = bool => {
    dispatch({ type: SET_ISPALYING, payload: bool })
  }

  const SetPlayingIndex=(index)=>{
    dispatch({type:SET_PALYING_INDEX,payload:index})
  }

  return (
    <Music_Context.Provider
      value={{
        state,
        UserLogin,
        GetAllUsers,
        UpdateUserRole,
        GetAlbums,
        GetArtists,
        AlbumFilter,
        ArtistFilter,
        LanguageFilter,
        CatogeryFilter,
        AlbumSave,
        ArtistSave,
        SongSave,
        SetAllSongs,
        AlbumDeleted,
        ArtistDeleted,
        SongDeleted,
        SetPlaying,
        SetPlayingIndex
      }}
    >
      {children}
    </Music_Context.Provider>
  )
}
export default ContextProvider
