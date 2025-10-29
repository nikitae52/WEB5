
/*Функція для встановлення cookie*/
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

/*Функція для отримання cookie*/
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

/*Функція для видалення cookie*/
function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999; path=/; SameSite=Lax';
}

/*Негайна перевірка cookie для Завдання 3 та основна логіка сайту,
 приховання вебсайту до взаємодії з користувачем*/

const cookieName = 'wordCountResult_v7';
const wordCountCookie = getCookie(cookieName);
let showCookieForm = true; // Прапор, який передамо в DOMContentLoaded

if (wordCountCookie) {
  // Діалогове вікно блокує виконання, поки користувач не натисне
  const deleteData = confirm(`Збережений результат: "${wordCountCookie}".\n\nБажаєте видалити ці дані?`);

  if (deleteData) {
    deleteCookie(cookieName);
    alert('Дані з cookies видалено. Сторінка оновиться.');
    location.reload();
    // Скрипт зупинить виконання тут, оскільки сторінка перезавантажується
  } else {
    alert('Дані не видалено. Cookies існують. Форма не буде показана.');
    showCookieForm = false; // Повідомляємо DOM-скрипту не показувати форму
  }
}

/**
 * ==========================================================
 * ОСНОВНА ЛОГІКА САЙТУ (після діалогового вікна)
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // РОБИМО САЙТ ВИДИМИМ лише ПІСЛЯ того, як користувач
  // взаємодіяв з діалоговим вікном (якщо воно було).
  const container = document.querySelector('.container');
  if (container) {
    container.style.visibility = 'visible';
  }

  // Запускаємо Завдання 1 та 2 одразу
  swapBlocksContent();
  calculateOvalArea();
  
  // Запускаємо решту завдань, передаючи прапор про cookie
  setupCookieTask(showCookieForm);
  setupAlignmentTask();
  setupBlockEditorTask();


  /* Завдання 1: Міняє місцями вміст (HTML) та CSS-класи блоків .block4 та .block5.*/
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
    }
  }

  /* Завдання 2: Обчислює площу овала за заданими
     константами (a=15, b=25) та виводить результат в кінець блоку .block3.*/
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
    }
  }

  /* Завдання 3 (Частина 2): Створення форми (якщо потрібно)
      Приймає прапор 'shouldShowForm' з глобальної перевірки. */
  function setupCookieTask(shouldShowForm) {
    const block3 = document.querySelector('.block3');

    // Якщо 'shouldShowForm' істинне, створюємо форму
    if (shouldShowForm && block3) {
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

      // Додаємо обробник події для кнопки підрахунку слів
      document.getElementById('wordCountButton').addEventListener('click', () => {
        const text = document.getElementById('wordCountText').value;
        const words = text.trim().split(/\s+/).filter(Boolean);
        const count = words.length;
        const resultMessage = `Кількість слів у тексті: ${count}`;

        alert(resultMessage);
        setCookie(cookieName, resultMessage, 7); // Використовуємо глобальну функцію
        formContainer.style.display = 'none';
      });
    }
    // Якщо shouldShowForm == false, функція просто нічого не робить,
    // і форма не створюється.
  }

  /**
   * Завдання 4: Ініціалізує логіку вирівнювання.
   */
  function setupAlignmentTask() {
    const block3 = document.querySelector('.block3');
    if (!block3) {
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

    // Функція для вирівнювання блоків
    function alignBlocks() {
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

    // Функція для відновлення стану вирівнювання з localStorage
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
            // ВИПРАВЛЕННЯ: Встановлюємо 'center' за замовчуванням для всіх
            restoredAlign = 'center';
            checkbox.checked = false;
          }
          
          block.style.textAlign = restoredAlign;
        }
      });
    }

    document.addEventListener('dblclick', alignBlocks);

    restoreAlignment();
  }


  /**
   * Завдання 5: Ініціалізує логіку редагування блоків.
   */
  function setupBlockEditorTask() {
    
    const block3 = document.querySelector('.block3');
    let block3EditableOriginalHTML = '';
    // Збереження оригінального вмісту блоку 3 (зображення та карта)
    if (block3) {
      const block3Img = block3.querySelector('img');
      const block3Map = block3.querySelector('map');
      block3EditableOriginalHTML = (block3Img ? block3Img.outerHTML : '') + (block3Map ? block3Map.outerHTML : '');
    }

    const originalBlockContent = {};
    const blockSelectors = ['.block1', '.block2', '.block3', '.block4', '.block5', '.block6', '.block7'];

    let currentEditingForm = null; 

    // Відновлення збереженого вмісту блоків з localStorage
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

        // Якщо знайдено збережений вміст, відновлюємо його
        if (savedContent !== null) {
          if (selector === '.block3') {
            // Для блоку 3 - замінюємо лише картинку/карту
            const oldImg = block.querySelector('img');
            const oldMap = block.querySelector('map');
            if (oldImg) oldImg.remove();
            if (oldMap) oldMap.remove();
            block.insertAdjacentHTML('afterbegin', savedContent);
            block.style.fontStyle = 'italic';
            addRestoreButton(block, selector, originalBlockContent[selector]);
          } else {
            // Для інших блоків - замінюємо весь вміст
            block.innerHTML = savedContent;
            block.style.fontStyle = 'italic'; 
            addRestoreButton(block, selector, originalBlockContent[selector]);
          }
        }
      }
    });

    if (!block3) {
      return;
    }
    // Створення інтерфейсу редактора блоків
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
    
    // Збереження повного HTML блоку 3 перед редагуванням
    const fullBlock3HtmlBeforeEdit = block3.innerHTML;
    
    const blockSelect = document.getElementById('blockEditorSelect');

    // Обробник зміни вибору блоку для редагування
    blockSelect.addEventListener('change', (e) => {
      const selectedBlockSelector = e.target.value;
    
      // Якщо вже відкрито форму редагування, закриваємо її та відновлюємо попередній блок
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
        return;
      }
      //отримуємо вміст для редагування
      const storageKey = `editedBlockContent_v7_${selectedBlockSelector}`;
      const contentToEdit = localStorage.getItem(storageKey) ?? originalBlockContent[selectedBlockSelector];
      
      // Створення форми редагування
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

      // Додаємо форму редагування до блоку
      if (selectedBlockSelector === '.block3') {
        const oldImg = targetBlock.querySelector('img');
        const oldMap = targetBlock.querySelector('map');
        if (oldImg) oldImg.remove();
        if (oldMap) oldMap.remove();
        targetBlock.insertAdjacentElement('afterbegin', form);
      }
      // Для інших блоків просто замінюємо вміст 
      else {
        targetBlock.innerHTML = '';
        targetBlock.appendChild(form);
      }
      // Встановлюємо нормальний стиль шрифту під час редагування
      targetBlock.style.fontStyle = 'normal';

      // Обробники подій для кнопок збереження та скасування
      saveButton.addEventListener('click', () => {
        const newContent = textarea.value;
        // Збереження відредагованого вмісту в localStorage
        localStorage.setItem(storageKey, newContent);
        
        //Для блоку 3 вставляємо HTML зображення та карти
        if (selectedBlockSelector === '.block3') {
          form.remove();
          targetBlock.insertAdjacentHTML('afterbegin', newContent);
          targetBlock.style.fontStyle = 'italic';
          addRestoreButton(targetBlock, selectedBlockSelector, originalBlockContent[selectedBlockSelector]);
        } 
        //Для інших блоків просто оновлюємо вміст
        else {
          targetBlock.innerHTML = newContent;
          targetBlock.style.fontStyle = 'italic';
          addRestoreButton(targetBlock, selectedBlockSelector, originalBlockContent[selectedBlockSelector]);
        }
        
        currentEditingForm = null; 
        blockSelect.value = ''; 
      });

      // Обробник скасування редагування
      cancelButton.addEventListener('click', () => {
        restoreBlockState(targetBlock, selectedBlockSelector);
        
        currentEditingForm = null; 
        blockSelect.value = ''; 
      });
    });
    
    /**
     * Внутрішня функція (Завдання 5):
     * Відновлює стан блоку при скасуванні
     * редагування або при початковому завантаженні.
     */
    function restoreBlockState(blockElement, blockSelector) {
      const storageKey = `editedBlockContent_v7_${blockSelector}`;
      const savedContent = localStorage.getItem(storageKey);
      
      blockElement.querySelector('.editor-form-v7')?.remove();

      if (savedContent !== null) {
        // Якщо є збережений вміст, відновлюємо його
        // Для блоку 3 вставляємо HTML зображення та карти
        if (blockSelector === '.block3') {
          const oldImg = blockElement.querySelector('img');
          const oldMap = blockElement.querySelector('map');
          if (oldImg) oldImg.remove();
          if (oldMap) oldMap.remove();
          blockElement.insertAdjacentHTML('afterbegin', savedContent);
          blockElement.style.fontStyle = 'italic';
          addRestoreButton(blockElement, blockSelector, originalBlockContent[blockSelector]);
        } 
        // Для інших блоків просто оновлюємо вміст
        else {
          blockElement.innerHTML = savedContent;
          blockElement.style.fontStyle = 'italic';
          addRestoreButton(blockElement, blockSelector, originalBlockContent[blockSelector]);
        }
      } 
      //В іншому випадку відновлюємо оригінальний вміст
      else {
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

    /**
     * Внутрішня функція (Завдання 5):
     * Додає кнопку "Відновити початковий вміст"
     * до редагованого блоку.
     */
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
        // Для блоку 3 розміщуємо кнопку після зображення
        const img = blockElement.querySelector('img');
        if (img) {
          img.insertAdjacentElement('afterend', restoreButton);
        } else {
          blockElement.appendChild(restoreButton);
        }
      } else {
        // Для інших блоків розміщуємо кнопку в кінці блоку
         blockElement.appendChild(restoreButton);
      }
     
      // Обробник події для кнопки відновлення
      restoreButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        localStorage.removeItem(`editedBlockContent_v7_${blockSelector}`);
        
        if (blockSelector === '.block3') {
          // Для блоку 3 вставляємо HTML зображення та карти
          const oldImg = blockElement.querySelector('img');
          const oldMap = blockElement.querySelector('map');
          if (oldImg) oldImg.remove();
          if (oldMap) oldMap.remove();
          
          blockElement.insertAdjacentHTML('afterbegin', originalHtml);
          blockElement.style.fontStyle = 'normal';
        } 
        else {
          // Для інших блоків просто відновлюємо вміст
          blockElement.innerHTML = originalHtml;
          blockElement.style.fontStyle = 'normal';
        }
        // Видаляємо кнопку після відновлення
        restoreButton.remove();
      });
    }
  }
});
