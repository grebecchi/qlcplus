/*
  Q Light Controller Plus
  FunctionDrag.js

  Copyright (c) Massimo Callegari

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/ 

var itemComponent = null;
var draggedItem = null;
var startingMouse;
var posnInWindow;

var fID, fLabel, fIcon

function initProperties(id, label, icon)
{
    fID = id
    fLabel = label
    fIcon = icon
}

//Creation is split into two functions due to an asynchronous wait while
//possible external files are loaded.

function loadComponent()
{
    if (itemComponent != null) // component has been previously loaded
    {
        createItem();
        return;
    }

    itemComponent = Qt.createComponent("FunctionDragItem.qml");
    createItem();
}

function createItem()
{
    if (itemComponent.status === Component.Ready && draggedItem == null)
    {
        draggedItem = itemComponent.createObject(mainView,
                  {"x": posnInWindow.x, "y": posnInWindow.y, "z": 10,
                   "funcID": fID, "funcLabel": fLabel, "funcIcon": fIcon, "Drag.keys": "function" });
    }
    else if (itemComponent.status === Component.Error)
    {
        draggedItem = null;
        console.log("error creating component");
        console.log(itemComponent.errorString());
    }
}

function handleDrag(mouse)
{
    if (draggedItem == null)
    {
        posnInWindow = funcDelegate.mapToItem(mainView, 0, 0);
        loadComponent();
    }

    draggedItem.x = mouse.x + posnInWindow.x - 5;
    draggedItem.y = mouse.y + posnInWindow.y - 5;
}

function endDrag(mouse)
{
    if (draggedItem == null)
        return;

    draggedItem.Drag.drop();
    draggedItem.destroy();
    draggedItem = null;
}

