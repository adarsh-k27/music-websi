import React, { useState } from 'react'
import { useContext } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Music_Context } from '../context/index'
function FilterBox ({ menuData, flag }) {
  const {
    ArtistFilter,
    AlbumFilter,
    LanguageFilter,
    CatogeryFilter
  } = useContext(Music_Context)
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(false)

  const FilterSetUp = name => {
    //console.log('enter to filter setUp')
    if (flag == 'Artists') {
      console.log('artist', flag, name)
      ArtistFilter(name)
    }
    if (flag == 'Albums') {
      AlbumFilter(name)
    }
    if (flag == 'Language') {
      LanguageFilter(name)
    }
    if (flag == 'Catogery') {
      CatogeryFilter(name)
    }
  }

  return (
    <div className='w-36 flex flex-col '>
      <div
        className=' w-36  px-2 py-2 flex flex-col cursor-pointer '
        onClick={e => {
          e.preventDefault()
          setMenu(prev => !prev)
        }}
      >
        <p className='w-full flex gap-2 text-xs  text-black/60 font-semibold shadow-md shadow-black/20 font-serif items-center justify-between'>
          {!selected && flag}
          {selected && selected}
          <BsChevronDown
            className={`text-xs text-black/40 ${
              menu ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </p>
      </div>
      <div className='relative w-full px-1  top-1 bg-white/90'>
        <div className='w-full h-28 min-h-[144px] overflow-y-scroll scroll-smooth z-50'>
          {menuData &&
            menu &&
            menuData.map((menu, index) => (
              <div
                key={index}
                className='flex items-center gap-2 bg-white/5 py-1 cursor-pointer'
                onClick={e => {
                  e.preventDefault()
                  setSelected(menu.name)
                  setMenu(false)
                  FilterSetUp({name:menu.name,_id:menu._id})
                }}
              >
                {flag == 'Artists' ||
                  (flag == 'Albums' && (
                    <img
                      src={menu.imageUrl}
                      className='w-10 h-8 object-cover rounded-full '
                    ></img>
                  ))}
                <p>{menu.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBox
