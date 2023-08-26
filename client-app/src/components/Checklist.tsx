import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { PrimaryButton } from "./PrimaryButton";

type ChecklistItemProps = {
    idx: number,
    isSelected: boolean,
    onDelete: (idx: number) => void,
    onToggleSelect: (idx: number) => void,
    children?: ReactNode
}

type ChecklistProps<T> = {
    title: string,
    placeholder: string,
    itemRenderer: (item: T) => ReactNode,
    items: T[],
    setItems: (newItems: T[]) => void,
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
    idx,
    isSelected,
    onDelete,
    onToggleSelect,
    children,
}) => {
    return (
        <div className="w-full flex flex-row items-center">
            <Checkbox
                checked={Boolean(isSelected)}
                onChange={() => onToggleSelect(idx)}
            />
            {children}
            <button
                className="
                    py-1 px-2 duration-200
                    text-main-petrol hover:text-dark-petrol
                " 
                onClick={() => onDelete(idx)}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );
}

export function Checklist<T>({
    title,
    placeholder,
    itemRenderer,
    items,
    setItems
}: ChecklistProps<T>) {
    const [itemsCheckState, setItemsCheckState] = useState(items.map(_ => false));

    useEffect(() => {
        setItemsCheckState(items.map(_ => false));
    }, [JSON.stringify(items)]);

    const deleteItem = (itemIdx: number) => {
        setItems(
            items.filter((_, i) => i !== itemIdx)
        );
    }

    const toggleSelectItem = (itemIdx: number) => {
        
        setItemsCheckState(
            Object.assign([], itemsCheckState, {[itemIdx]: !itemsCheckState[itemIdx]})
        );
    }

    const selectAllItems = () => {
        console.log(items);
        setItemsCheckState(items.map(_ => true));
    }

    const deleteSelectedItems = () => {
        setItems(
            items.reduce(
                (remainedItems, item, i) => {
                    if (!itemsCheckState[i]) {
                        remainedItems.push(item);
                    }
                    return remainedItems;
                },
                [] as T[]
            )
        )
    }

    return (
        <div
            className="
                rounded-xl w-full py-2 px-4
                border-2 border-main-petrol
                flex flex-col items-center
            "
        >
            <span className="w-full font-semibold border-b-main-petrol border-b-2 pb-1">{title}</span>
            {
                items.length?
                <div
                    className="w-full flex flex-col gap-1 overflow-y-scroll"
                    style={{
                        minHeight: '5rem',
                        maxHeight: '12rem',
                    }}
                >
                    {
                        items.map((item, idx) => {
                            return (
                                <ChecklistItem
                                    key={idx} idx={idx}
                                    isSelected={itemsCheckState[idx]}
                                    onDelete={deleteItem}
                                    onToggleSelect={toggleSelectItem}
                                >
                                    {itemRenderer(item)}
                                </ChecklistItem>
                            );                                
                        })
                    }
                </div>
                :
                <div
                    className="flex-1 flex justify-center items-center"
                    style={{
                        minHeight: '5rem',
                        maxHeight: '12rem',
                    }}
                >
                    {placeholder}
                </div>
            }
            <div className="w-full flex justify-between pt-2">
                <PrimaryButton onClick={deleteSelectedItems} disabled={!itemsCheckState.some(c => c)}>
                    Διαγραφή Επιλεγμένων
                </PrimaryButton>
                <PrimaryButton onClick={selectAllItems} disabled={!items.length}>
                    Επιλογή Όλων
                </PrimaryButton>
            </div>
        </div>
    )
}
