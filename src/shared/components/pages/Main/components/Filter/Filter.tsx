'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import Button from '@components/Button'
import Input from '@components/Input'
import MultiDropdown from '@components/MultiDropdown'
import search from '@components/icons/search.svg'
import slot from '@components/icons/slot.svg'
import clear from '@components/icons/clear.svg'
import { useCategoriesStore, useRecipeStore } from '@store/hooks/globalStores'
import type { Option } from '@components/MultiDropdown/MultiDropdown'
import { handleTitle } from '@utils/utils'
import { Categories } from '@entities/api/Categories'
import s from './Filter.module.scss'

const Filter: React.FC = observer(() => {
  const resipes = useRecipeStore()
  const categories = useCategoriesStore()

  const [tempSearch, setTempSearch] = React.useState<string>('')
  const [categoriesFilter, setCategoriesFilter] = React.useState<Option[]>([])
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [checkFilter, setCheckFilter] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const categoriesJSON = params.get('category')
      const searchUrl = params.get('search');
     
      if (categoriesJSON) {
        try {
          const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON))
          setCategoriesFilter(categoriesFromUrl)
          setCheckFilter(true)
        } catch (e) {
          console.error('Ошибка при разборе категорий из URL', e)
        }
      } else {
        setCheckFilter(true)
      }

      if(searchUrl){
        try{
          setTempSearch(searchUrl === null ? '' : searchUrl)
        }catch (e) {
          console.error('Ошибка при разборе search из URL', e)
        }
      }
    }
  }, []) 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (categoriesFilter.length > 0) {
        const jsonString = encodeURIComponent(JSON.stringify(categoriesFilter))
        params.set('category', jsonString)
      } else if (checkFilter) {
        params.delete('category')
      }
      window.history.replaceState(null, '', `?${params.toString()}`)
    }
  }, [categoriesFilter, checkFilter])

  useEffect(() => {
    resipes.setFiltersCategory(categoriesFilter)
  }, [categoriesFilter])

  useEffect(() => {
    resipes.setSearch(tempSearch)
  }, [tempSearch])

  return (
    <div className={s.filter}>
      <div className={s.search}>
        <div className={s.input}>
          <Input
            value={tempSearch}
            onChange={setTempSearch}
            placeholder={'Enter dishes'}
            width={'100%'}
            onChangeKey={(value) => {
              resipes.setSearch(value)
            }}
            afterSlot={
              <Image
                src={clear}
                alt=""
                onClick={() => {
                  setTempSearch('')
                  resipes.setSearch('')
                }}
                width={24}
                height={24}
              />
            }
          />
        </div>
        <Button
          search={true}
          onClick={() => {
            resipes.setSearch(tempSearch)
          }}
        >
          <Image src={search} alt="" width={24} height={24} />
        </Button>
      </div>
      <div className={s.category}>
        <MultiDropdown
          onChange={setCategoriesFilter}
          getTitle={handleTitle}
          options={categories.cleanCategories.map((item: Categories) => {
            return { key: item.id, value: item.title }
          })}
          value={categoriesFilter}
          afterSlot={
            <div className={s.categoriesFilter__slot}>
              <Image
                src={clear}
                alt=""
                onClick={() => {
                  setCategoriesFilter([])
                }}
                width={24}
                height={24}
              />
              <Image
                src={slot}
                alt=""
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                width={24}
                height={24}
              />
            </div>
          }
          isOpenCategory={isOpen}
          onOpenCategory={setIsOpen}
        />
      </div>
    </div>
  )
})

export default Filter
