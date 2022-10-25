import {
    ALBUM_FILTER,
    ALL_ALBUMS,
    ALL_ARTISTS,
    ALL_SONGS,
    ALL_USERS,
    ARTIST_FILTER,
    CATOGERY_FILTER,
    DELETE_ALBUM,
    DELETE_ARTIST,
    DELETE_SONG,
    INCREMENT,
    LANGUAGE_FILTER,
    SAVE_ALBUM,
    SAVE_ARTIST,
    SAVE_SONG,
    SET_ISPALYING,
    SET_PALYING_INDEX,
    SONG_LENGTH,
    UPDATE_ROLE,
    USER_LOGIN
} from "./action";

export const MusicReducer = (state, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                user: action.payload
            }
        }
        case ALL_USERS: {
            return {
                ...state,
                allUsers: action.payload
            }
        }
        case UPDATE_ROLE: {
            console.log("index context", action.index);
            return {
                ...state,
                allUsers: state.allUsers.map((user, index) => {
                    if (index == action.index) {
                        console.log("place to change Data");
                        user = action.payload
                    }
                    return user

                })
            }
        }
        case ALL_ALBUMS: {
            return {
                ...state,
                allAlbums: action.payload
            }
        }
        case ALL_ARTISTS: {
            return {
                ...state,
                allArtists: action.payload
            }
        }

        case ALBUM_FILTER: {
            return {
                ...state,
                albumFiter: action.payload
            }
        }

        case ARTIST_FILTER: {
            return {
                ...state,
                artistFilter: action.payload
            }
        }

        case LANGUAGE_FILTER: {
            return {
                ...state,
                languageFilter: action.payload
            }
        }

        case CATOGERY_FILTER: {
            return {
                ...state,
                catogeryFilter: action.payload
            }
        }
        case SAVE_ALBUM: {
            return {
                ...state,
                allAlbums: [...state.allAlbums, action.payload]
            }
        }

        case SAVE_ARTIST: {
            return {
                ...state,
                allArtists: [...state.allArtists, action.payload]
            }
        }

        case SAVE_SONG:{
            return{
                ...state,
                allSongs:[...state.allSongs,action.payload]
            }
        }

        case ALL_SONGS: {
            return {
                ...state,
                allSongs: action.payload

            }
        }

        case DELETE_ALBUM: {
            return {
                ...state,
                allAlbums: state.allUsers.filter((album) => album._id !== action.payload)
            }
        }

        case DELETE_ARTIST: {
            return {
                ...state,
                allArtists: state.allArtists.filter((artist) => artist._id !== action.payload)
            }
        }

        case DELETE_SONG: {
            return {
                ...state,
                allSongs: state.allSongs.filter((song) => song._id !== action.payload)
            }
        }

        case SET_ISPALYING:{
            return{
                ...state,
                Playing:action.payload
            }
        }

        case SET_PALYING_INDEX:{
            return{
                ...state,
                PlayingIndex:action.payload
            }
        }

        default: {
            return {}
        }

    }
}