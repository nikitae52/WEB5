document.addEventListener('DOMContentLoaded', () => {

  swapBlocksContent();
  calculateOvalArea();
  setupCookieTask();

  function swapBlocksContent() {
    const block4 = document.querySelector('.block4');
    const block5 = document.querySelector('.block5');

    if (block4 && block5) {
      const originalBlock4_HTML = block4.innerHTML;
      const originalBlock5_HTML = block5.innerHTML;
      block4.innerHTML = originalBlock5_HTML;
      block5.innerHTML = originalBlock4_HTML;
      block4.classList.remove('block4');
      block4.classList.add('block5');
      
      block5.classList.remove('block5');
      block5.classList.add('block4');
      
      console.log('Завдання 1: Вміст та стилі .block4 та .block5 успішно поміняно місцями.');
    } else {
      console.error('Завдання 1: Не вдалося знайти .block4 або .block5');
    }
  }

  function calculateOvalArea() {
    const a = 15;
    const b = 25;
    const area = Math.PI * a * b;

    const block3 = document.querySelector('.block3');

    if (block3) {
      const resultParagraph = document.createElement('p');
      resultParagraph.textContent = `Площа овала (a=${a}, b=${b}): ${area.toFixed(2)}`;
      resultParagraph.style.textAlign = 'center';
      resultParagraph.style.fontWeight = 'bold';
      resultParagraph.style.color = 'white';
      resultParagraph.style.fontSize = '1.3em';
      
      block3.appendChild(resultParagraph);
      console.log('Завдання 2: Площу овала обчислено та додано в блок 3.');
    } else {
       console.error('Завдання 2: Не вдалося знайти .block3');
    }
  }

  function setupCookieTask() {
    
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    function deleteCookie(name) {
      document.cookie = name + '=; Max-Age=-99999999; path=/; SameSite=Lax';
    }

    const cookieName = 'wordCountResult_v7';
    const wordCountCookie = getCookie(cookieName);
    const block3 = document.querySelector('.block3');

    setTimeout(() => {
      if (wordCountCookie) {
        console.log('Завдання 3: Знайдено cookie:', wordCountCookie);
        const deleteData = confirm(`Збережений результат: "${wordCountCookie}".\n\nБажаєте видалити ці дані?`);

        if (deleteData) {
          deleteCookie(cookieName);
          alert('Дані з cookies видалено. Сторінка оновиться.');
          location.reload(); 
        } else {
          alert('Дані не видалено. Cookies існують. Форма не буде показана.');
        }
      } else if (block3) {
        console.log('Завдання 3: Cookie не знайдено, створюємо форму.');
        const formContainer = document.createElement('div');
        formContainer.id = 'wordCountForm';
        formContainer.style.marginTop = '15px';
        formContainer.innerHTML = `
          <h4 style="color: white;font-size: 1.3em;">Завдання 3: Кількість слів</h4>
          <textarea id="wordCountText" 
            placeholder="Введіть свій текст сюди, але не забагато..." 
            style="width: 99%; 
                   box-sizing: border-box; 
                   overflow-y: hidden; 
                   resize: none;
                   min-height: 50px;
                   padding: 10px; 
                   font-size: 1.1rem;
                   background-color: #333;
                   color: white;
                   border: 1px solid #555;
                   "></textarea>
          <button id="wordCountButton" 
          style="font-size: 1rem; 
          padding: 5px;
          background-color: #555;
          color: white;
          border: 1px solid #777;
          cursor: pointer;
          ">Порахувати кількість слів</button>
        `;
        block3.appendChild(formContainer);

        document.getElementById('wordCountButton').addEventListener('click', () => {
          const text = document.getElementById('wordCountText').value;
          const words = text.trim().split(/\s+/).filter(Boolean);
          const count = words.length;
          const resultMessage = `Кількість слів у тексті: ${count}`;

          alert(resultMessage);
          setCookie(cookieName, resultMessage, 7);
          formContainer.style.display = 'none';
          console.log('Завдання 3: Результат збережено в cookies.');
        });
      } else {
        console.error('Завдання 3: Не вдалося знайти .block3 для додавання форми.');
      }

    setupAlignmentTask();
    setupBlockEditorTask();
    }, 10); 
  }

  function setupAlignmentTask() {
    const block3 = document.querySelector('.block3');
    if (!block3) {
      console.error('Завдання 4: Не вдалося знайти .block3 для форми.');
      return;
    }

    const alignForm = document.createElement('div');
    alignForm.id = 'alignFormContainer';
    alignForm.style.marginTop = '15px';
    
    alignForm.innerHTML = `
      <h4 style="color: white;font-size: 1.3em;">Завдання 4: Вирівнювання (dblclick)</h4>
      <label style="color: white;font-size: 1.3em;"><input type="checkbox" class="alignment-checkbox" data-block="3"> Вирівняти блок 3</label><br>
      <label style="color: white;font-size: 1.3em;"><input type="checkbox" class="alignment-checkbox" data-block="4"> Вирівняти блок 4</label><br>
      <label style="color: white;font-size: 1.3em;"><input type="checkbox" class="alignment-checkbox" data-block="5"> Вирівняти блок 5</label>
    `;
    block3.appendChild(alignForm);

    const blocks = {
      '3': document.querySelector('.block3'),
      '4': document.querySelector('.block4'),
      '5': document.querySelector('.block5')
    };

    function alignBlocks() {
      console.log('Завдання 4: dblclick! Застосування стилів.');
      const checkboxes = document.querySelectorAll('.alignment-checkbox');
      
      checkboxes.forEach(checkbox => {
        const blockNum = checkbox.dataset.block;
        const block = blocks[blockNum];
        if (block) {
          const alignValue = checkbox.checked ? 'left' : 'center'; 
          block.style.textAlign = alignValue;
          
          if (checkbox.checked) {
            localStorage.setItem(`block${blockNum}Align_v7`, 'left');
          } else {
            if (blockNum === '4') { 
              localStorage.removeItem(`block${blockNum}Align_v7`);
            } else {
              localStorage.setItem(`block${blockNum}Align_v7`, 'center');
            }
          }
        }
      });
    }

    function restoreAlignment() {
      const checkboxes = document.querySelectorAll('.alignment-checkbox');
      checkboxes.forEach(checkbox => {
        const blockNum = checkbox.dataset.block;
        const savedState = localStorage.getItem(`block${blockNum}Align_v7`);
        const block = blocks[blockNum];
        
        if (block) {
          let restoredAlign = 'initial';
          
          if (savedState === 'left') {
            restoredAlign = 'left';
            checkbox.checked = true;
          } else if (savedState === 'center') {
            restoredAlign = 'center';
            checkbox.checked = false;
          } else {
            restoredAlign = (blockNum === '4') ? 'center' : 'initial';
            checkbox.checked = false;
          }
          
          block.style.textAlign = restoredAlign;
        }
      });
      console.log('Завдання 4: Стилі вирівнювання відновлено з localStorage.');
    }

    document.addEventListener('dblclick', alignBlocks);

    restoreAlignment();
  }

  function setupBlockEditorTask() {
    
    const block3 = document.querySelector('.block3');
    let block3EditableOriginalHTML = '';
    if (block3) {
      const block3Img = block3.querySelector('img');
      const block3Map = block3.querySelector('map');
      block3EditableOriginalHTML = (block3Img ? block3Img.outerHTML : '') + (block3Map ? block3Map.outerHTML : '');
    }

    const originalBlockContent = {};
    const blockSelectors = ['.block1', '.block2', '.block3', '.block4', '.block5', '.block6', '.block7'];

    let currentEditingForm = null; 

    blockSelectors.forEach(selector => {
      const block = document.querySelector(selector);
      if (block) {
        
        if (selector === '.block3') {
          originalBlockContent[selector] = block3EditableOriginalHTML;
        } else {
          originalBlockContent[selector] = block.innerHTML;
        }

        const storageKey = `editedBlockContent_v7_${selector}`;
        const savedContent = localStorage.getItem(storageKey);

        if (savedContent !== null) {
          console.log(`Завдання 5: Відновлено вміст для ${selector} з localStorage.`);
          
          if (selector === '.block3') {
            const oldImg = block.querySelector('img');
            const oldMap = block.querySelector('map');
            if (oldImg) oldImg.remove();
            if (oldMap) oldMap.remove();
            block.insertAdjacentHTML('afterbegin', savedContent);
            block.style.fontStyle = 'italic';
            addRestoreButton(block, selector, originalBlockContent[selector]);
          } else {
            block.innerHTML = savedContent;
            block.style.fontStyle = 'italic'; 
            addRestoreButton(block, selector, originalBlockContent[selector]);
          }
        }
      } else {
        console.warn(`Завдання 5: Блок ${selector} не знайдено.`);
      }
    });

    if (!block3) {
      console.error('Завдання 5: .block3 не знайдено, неможливо додати UI редактора.');
      return;
    }

    const editorUIContainer = document.createElement('div');
    editorUIContainer.id = 'editorTaskContainer';
    editorUIContainer.style.marginTop = '15px';
    editorUIContainer.style.color = 'white'; 
    
    editorUIContainer.innerHTML = `
      <h4 style="
      color: white; 
      font-size: 1.3em;">Завдання 5: Редагування блоків</h4>
      <select id="blockEditorSelect" 
      style="font-size: 1.0em; 
      margin-top: 5px;
      width: 99%; 
      color: white;
      background-color: #333;
      border: 1px solid #555;">
        <option value="">-- Оберіть блок для редагування --</option>
        <option value=".block1">Блок 1 (Header)</option>
        <option value=".block2">Блок 2 (Прапор)</option>
        <option value=".block3">Блок 3 (Танк + UI)</option>
        <option value=".block4">Блок 4 (Переваги)</option>
        <option value=".block5">Блок 5 (Нові танки)</option>
        <option value=".block6">Блок 6 (Навичка)</option>
        <option value=".block7">Блок 7 (Footer)</option>
      </select>
    `;
    
    block3.appendChild(editorUIContainer);
    
    const fullBlock3HtmlBeforeEdit = block3.innerHTML;
    
    const blockSelect = document.getElementById('blockEditorSelect');

    blockSelect.addEventListener('change', (e) => {
      const selectedBlockSelector = e.target.value;

      if (currentEditingForm) {
        const oldBlock = currentEditingForm.parentElement;
        const oldSelector = Array.from(oldBlock.classList).map(c => `.${c}`).find(c => blockSelectors.includes(c));
        
        restoreBlockState(oldBlock, oldSelector);
        
        currentEditingForm.remove();
        currentEditingForm = null;
      }
      
      if (!selectedBlockSelector) {
        return; 
      }
      
      const targetBlock = document.querySelector(selectedBlockSelector);
      if (!targetBlock) {
        console.error(`Завдання 5: Не вдалося знайти цільовий блок: ${selectedBlockSelector}`);
        return;
      }
      
      const storageKey = `editedBlockContent_v7_${selectedBlockSelector}`;
      const contentToEdit = localStorage.getItem(storageKey) ?? originalBlockContent[selectedBlockSelector];
      
      const form = document.createElement('div');
      form.className = 'editor-form-v7';
      form.style.padding = '10px';
      form.style.border = '1px dashed white';
      currentEditingForm = form;

      const textarea = document.createElement('textarea');
      textarea.value = contentToEdit;
      textarea.style.cssText = 'width: 100%; min-height: 150px; box-sizing: border-box; font-family: monospace; color: white; background-color: #333; border: 1px solid #555;';
      
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Зберегти';
      saveButton.style.cssText = 'font-size: 0.9em; padding: 5px; margin-top: 5px; color: white;background-color: #555; border: 1px solid #777; cursor: pointer;';

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Скасувати';
      cancelButton.style.cssText = 'font-size: 0.9em; padding: 5px; margin-top: 5px; margin-left: 10px; color: white; background-color: #555; border: 1px solid #777; cursor: pointer;';

      form.appendChild(textarea);
      form.appendChild(saveButton);
      form.appendChild(cancelButton);

      if (selectedBlockSelector === '.block3') {
        const oldImg = targetBlock.querySelector('img');
        const oldMap = targetBlock.querySelector('map');
        if (oldImg) oldImg.remove();
        if (oldMap) oldMap.remove();
        targetBlock.insertAdjacentElement('afterbegin', form);
      } else {
        targetBlock.innerHTML = '';
        targetBlock.appendChild(form);
      }
      targetBlock.style.fontStyle = 'normal';

      saveButton.addEventListener('click', () => {
        const newContent = textarea.value;
        localStorage.setItem(storageKey, newContent);
        
        if (selectedBlockSelector === '.block3') {
          form.remove();
          targetBlock.insertAdjacentHTML('afterbegin', newContent);
          targetBlock.style.fontStyle = 'italic';
          addRestoreButton(targetBlock, selectedBlockSelector, originalBlockContent[selectedBlockSelector]);
        } else {
          targetBlock.innerHTML = newContent;
          targetBlock.style.fontStyle = 'italic';
          addRestoreButton(targetBlock, selectedBlockSelector, originalBlockContent[selectedBlockSelector]);
        }
        
        currentEditingForm = null; 
        blockSelect.value = ''; 
      });

      cancelButton.addEventListener('click', () => {
        restoreBlockState(targetBlock, selectedBlockSelector);
        
        currentEditingForm = null; 
        blockSelect.value = ''; 
      });
    });
    
    function restoreBlockState(blockElement, blockSelector) {
      const storageKey = `editedBlockContent_v7_${blockSelector}`;
      const savedContent = localStorage.getItem(storageKey);
      
      blockElement.querySelector('.editor-form-v7')?.remove();

      if (savedContent !== null) {
        if (blockSelector === '.block3') {
          const oldImg = blockElement.querySelector('img');
          const oldMap = blockElement.querySelector('map');
          if (oldImg) oldImg.remove();
          if (oldMap) oldMap.remove();
          blockElement.insertAdjacentHTML('afterbegin', savedContent);
          blockElement.style.fontStyle = 'italic';
          addRestoreButton(blockElement, blockSelector, originalBlockContent[blockSelector]);
        } else {
          blockElement.innerHTML = savedContent;
          blockElement.style.fontStyle = 'italic';
          addRestoreButton(blockElement, blockSelector, originalBlockContent[blockSelector]);
        }
      } else {
        if (blockSelector === '.block3') {
          const oldImg = blockElement.querySelector('img');
          const oldMap = blockElement.querySelector('map');
          if (oldImg) oldImg.remove();
          if (oldMap) oldMap.remove();
          blockElement.insertAdjacentHTML('afterbegin', originalBlockContent[blockSelector]);
          blockElement.style.fontStyle = 'normal';
        } else {
          blockElement.innerHTML = (blockSelector === '.block3') ? fullBlock3HtmlBeforeEdit : originalBlockContent[blockSelector];
          blockElement.style.fontStyle = 'normal';
        }
      }
    }

    function addRestoreButton(blockElement, blockSelector, originalHtml) {
      if (blockElement.querySelector(`.restore-button-v7[data-target="${blockSelector}"]`)) {
        return;
      }
      
      const restoreButton = document.createElement('button');
      restoreButton.textContent = 'Відновити початковий вміст';
      restoreButton.className = 'restore-button-v7';
      restoreButton.dataset.target = blockSelector;
      restoreButton.style.cssText = `
        font-size: 0.8rem;
        padding: 3px; 
        margin: 10px auto 0; 
        display: block; 
        cursor: pointer; 
        color: white;
        background-color: #555;
        border: 1px solid #777;
      `;
      
      if (blockSelector === '.block3') {
        const img = blockElement.querySelector('img');
        if (img) {
          img.insertAdjacentElement('afterend', restoreButton);
        } else {
          blockElement.appendChild(restoreButton);
        }
      } else {
         blockElement.appendChild(restoreButton);
      }
     
      
      restoreButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        localStorage.removeItem(`editedBlockContent_v7_${blockSelector}`);
        
        if (blockSelector === '.block3') {
          const oldImg = blockElement.querySelector('img');
          const oldMap = blockElement.querySelector('map');
          if (oldImg) oldImg.remove();
          if (oldMap) oldMap.remove();
          
          blockElement.insertAdjacentHTML('afterbegin', originalHtml);
          blockElement.style.fontStyle = 'normal';
        } else {
          blockElement.innerHTML = originalHtml;
          blockElement.style.fontStyle = 'normal';
        }
        
        restoreButton.remove();
        console.log(`Завдання 5: ${blockSelector} відновлено до оригіналу.`);
      });
    }
  }
});