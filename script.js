// ПЕРЕМЕННЫЕ

let canvas = window.document.querySelector('#canvas') // Основной холст
let objects = window.document.querySelector('#objects') // Холст с объектами

objects.style.pointerEvents = "none"; // Отключаем клики мышкой по игровым объектам

// Переменные и массивы с объектами
let blocks = []              // Твёрдые объекты

let gravityObjects = []      // Объекты с гравитацией (Падающие)
let speedFallingObjects = [] // Скорость падения объектов с гравитацией
let isFallingObjects = []    // Падают ли объекты с гравитацией

let inertiaObjects = []          // объекты с инерцией (способные передавать друг другу инерционную энергию по оси x, т.е. толкать друг друга)
let inertialEnergyObjects = []   // Инерционная энергия объектов с инерцией

let player = null;                         // игрок
let playerIsJumping = false                // прыгает ли игрок
const PLAYER_MAX_HEALTH = 10;              // Максимальное здоровье игрока
let playerHealth = PLAYER_MAX_HEALTH;      // Здоровье игрока
let playerInvTime = 0;                     // Время неуязвимости игрока после получения урона

let isShooting = false           // Стреляет ли сейчас игрок
let bullets = []                 // массив пуль
const RELOAD_TIME = 8;          // Скорострельность (Скалько кадров нужно на перезарядку), чем меньше, тем быстрее происходит стрельба
let reload = 0;                  // Сколько кадров осталось до следующей пули
const BULLETS_SPEED = 30;        // скорость пуль
let bulletsVectors = []          // массив единичных векторов пуль задающих им направления
let BULLET_SIZE = 15;            // размер пули в пикселях (квадрат)

// зажаты ли кнопки отвечающие за разные действия игрока
let leftDirKey = false;
let rightDirKey = false;
let jumpKey = false

let enemies = []            // враги
let enemiesDir = []         // направления движения врагов (stand, left, right)
let enemiesVis = []         // области видимости врагов
let enemiesAngryTime = []   // Если враг увидел игрока, он начинает агриться на него, в этом массиве указано время агра в кадрах
let enemiesMoveTime = []    // Время в кадрах, которое враг двигается в выбранном направлении (по истечению этого времени он снова случайно выбирает направление)
let enemiesHealth = []      // Здоровье врагов

let boxes = []      // ящики (их можно перемещать и вставать на них)

let mouseX = 0;     // Координаты курсора мыши
let mouseY = 0;

// Шкала здоровья игрока
let healthScale = window.document.createElement('div');
let maxHealthScale = window.document.createElement('div');
// Сколько еще времени в кадрах будет показываться здоровье игрока
let healthScaleTime = 0;

// шкалы здоровья врагов
let enemyHealthScale = [];
let enemyMaxHealthScale = [];
// Сколько еще времение в кадрах будет показываться здоровье врагов
let enemyHealthScaleTime = [];

// массив шипов
let spikes = [];

// Переменная для спрайта пушки
let gunImg = null;

// Выход в следующий уровень
let door = null;

// Число смертей
let countDead = 0;

// Массив всех уровней
levels = [];

// Создание надписи числа смертей
let numDead = document.createElement('div');
numDead.style.position = 'absolute';
numDead.style.left = `100px`;
numDead.style.bottom = `660px`;
numDead.style.background = 'rgba(200, 0, 0, 0.3)';
numDead.style.color = 'white';
numDead.style.width = '50px';
numDead.style.height = '50px';
numDead.style.overflow = 'hidden'; 
numDead.style.borderRadius = '50%'; 
 numDead.style.border = '2px solid blue';
numDead.textContent = `${countDead}`;
numDead.style.fontSize = '25px';

numDead.style.display = 'flex';  
numDead.style.justifyContent = 'center';   
numDead.style.alignItems = 'center';

levels.push([                                // 1 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0    p                  e      0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 2 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0              e               0',
    '0         000000000000         0',
    '0                              0',
    '0                              0',
    '0              p               0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 3 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                  e           0',
    '0                0000000       0',
    '0               00             0',
    '0      0000                    0',
    '0         00                   0',
    '0                              0',
    '0                              0',
    '0             000              0',
    '0                              0',
    '0                              0',
    '0        000000000             0',
    '0                         p    0',
    '0                      000000000',
    '0                              0',
    '0                              0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 4 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                          p   0',
    '000000000000    0000000000000000',
    '000000000000    0              0',
    '000000000000    0             e0',
    '000000000000    0             00',
    '000000000000    0            000',
    '000000000000    0              0',
    '000000000000    0              0',
    '000000000000    0              0',
    '000000000000    000000000 000000',
    '000000000000                   0',
    '000000000000                   0',
    '000000000000    0000000000000000',
    '000000000000    0000000000000000',
    '000000000000    0000000000000000',
    '00000000000000000000000000000000'
]);
levels.push([                                // 5 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0e                             0',
    '00000          0000            0',
    '0                              0',
    '0        0                     0',
    '0                              0',
    '0              00000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '00   p                      1 00',
    '00000000000000000000000000000000'
]);
levels.push([                                // 6 уровень
    '00000000000000000000000000000000',
    '0      0                       0',
    '0      0    r    e             0',
    '0      00000000000000000       0',
    '0                              0',
    '0                              0',
    '0                         000000',
    '0                         0    0',
    '0  1                      0    0',
    '00000000                  0    0',
    '0                         0    0',
    '0         00000000000000000    0',
    '0                              0',
    '0       p                      0',
    '0   0000000                    0',
    '0                              0',
    '0******************************0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 7 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0   000000000000000000000      0',
    '0   0              0           0',
    '0   0              0           0',
    '0   0              0    0      0',
    '0                  0           0',
    '0                  0           0',
    '0   0              0           0',
    '0   0              0    0      0',
    '0   0    r  *   e  0           0',
    '0   0000000000000000           0',
    '0                              0',
    '0                       0      0',
    '0                              0',
    '0    p   *      *              0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 8 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                     1       00',
    '0      0000000000000000000000000',
    '0           0       0          0',
    '0  p        0       0          0',
    '0000        0       0          0',
    '0           0                  0',
    '0           0       *    r  e  0',
    '0           0       000000000000',
    '0           0       000000000000',
    '0           0      0000000000000',
    '0                   000000000000',
    '0                   000000000000',
    '0                   000000000000',
    '0***********0******0000000000000',
    '00000000000000000000000000000000'
]);
levels.push([                                // 9 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0        000000000000000000    0',
    '0                         0    0',
    '0                         0    0',
    '0                         0    0',
    '0     0                   0    0',
    '0          00             0    0',
    '0                         0    0',
    '0                *********0    0',
    '0                0000000000    0',
    '0          00    0             0',
    '0    p           0  e          0',
    '0   00           0000000000    0',
    '0                              0',
    '0******************************0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 10 уровень
    '00000000000000000000000000000000',
    '0           0                  0',
    '0           0         r        0',
    '0    00000  00000  00000000    0',
    '0        0  0             0    0',
    '0        0  0             0    0',
    '0        0  0             0    0',
    '0    00000  00000         0    0',
    '0        0  0             0    0',
    '0        0  0             0    0',
    '0    00000  00000      ***0    0',
    '0        0  0          0000    0',
    '0        0  0          0       0',
    '0    00000  0          0e      0',
    '0        0  00000      0000    0',
    '0        0                     0',
    '0*** p   0         ************0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 11 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0        *     e    *          0',
    '00000 0000000000000000000 000000',
    '0                              0',
    '0         r         r    *     0',
    '000000000000    0000000000000000',
    '0                              0',
    '0           *     r            0',
    '00000000  00000000000 0000000000',
    '0                              0',
    '0   r   *          r      *    0',
    '00000000000000  0000000000000000',
    '0                              0',
    '0   p     *        *******     0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 12 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0   1   e                      0',
    '0   00000                      0',
    '00  0                          0',
    '0   0                          0',
    '0   0                          0',
    '0   0                          0',
    '00  0        2     2           0',
    '0   0        0     0          00',
    '0   0                          0',
    '0   0                          0',
    '0   0                          0',
    '000                            0',
    '0    p   *                     0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 13 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                      R       0',
    '0                   000000000 00',
    '0                   0          0',
    '0                   0          0',
    '0e                  0          0',
    '00                  0   00000000',
    '0                   0          0',
    '0                   0          0',
    '0 ******************0          0',
    '000000000000000000000   00000000',
    '0                      00      0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0    p *  R  *     *    * *****0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 14 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                         1 0  0',
    '0 e                       000  0',
    '000000******0***************0 00',
    '00000000000000000000000000000  0',
    '0                           0  0',
    '0                           0  0',
    '0                             00',
    '0                              0',
    '0                              0',
    '0                              0',
    '0 p                           00',
    '000*******************0********0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 15 уровень
    '00000000000000000000000000000000',
    '00                             0',
    '00               1             0',
    '00   0000000000000000000000000 0',
    '00     0         0             0',
    '0      0         0             0',
    '0      0    R  e 0            00',
    '0      00 00000000             0',
    '000    0                       0',
    '00     0                     000',
    '00     00          2           0',
    '0                  0  0        0',
    '0                     0        0',
    '0                     0        0',
    '0                     0        0',
    '0     p      *             * 2 0',
    '00000000000000000000000000000000',
    '00000000000000000000000000000000'
]);
levels.push([                                // 16 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0        *                     0',
    '00 00000000000000000000        0',
    '0             0                0',
    '0             0                0',
    '0             0                0',
    '0   *      e  0       0        0',
    '000000000000000                0',
    '0                              0',
    '0                     0        0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0                              0',
    '0    p        R          R     0',
    '00000000000000000000000000000000'
]);
levels.push([                                // 17 уровень
    '00000000000000000000000000000000',
    '0                              0',
    '0                              0',
    '0                              0',
    '0    0                         0',
    '0    0000                      0',
    '0    0        000     0        0',
    '0    0                         0',
    '0    0                         0',
    '0    0                         0',
    '0    0                0        0',
    '0    0                0        0',
    '0 e  0               000      00',
    '000000                0        0',
    '0                     0        0',
    '0                              0',
    '0  *     p   *     r     *     0',
    '00000000000000000000000000000000'
]);

// Переменная номер уровня
let level = 1;

// ФУНКЦИИ

// Очистка холста от объектов
const clearObjects = () => {
    objects.innerHTML = '';  // Эта строка УДАЛЯЕТ ВСЕ ДОЧЕРНИЕ ОБЪЕКТЫ objects

    // Далее обнуление всех переменных и массивов
    blocks = []              // Твёрдые объекты

    gravityObjects = []      // Объекты с гравитацией (Падающие)
    speedFallingObjects = [] // Скорость падения объектов с гравитацией
    isFallingObjects = []    // Падают ли объекты с гравитацией
    
    inertiaObjects = []          // объекты с инерцией (способные передавать друг другу инерционную энергию по оси x, т.е. толкать друг друга)
    inertialEnergyObjects = []   // Инерционная энергия объектов с инерцией
    
    player = null;                         // игрок
    playerIsJumping = false                // прыгает ли игрок
    playerHealth = PLAYER_MAX_HEALTH;      // Здоровье игрока
    playerInvTime = 0;                     // Время неуязвимости игрока после получения урона
    
    isShooting = false           // Стреляет ли сейчас игрок
    bullets = []                 // массив пуль
    reload = 0;                  // Сколько кадров осталось до следующей пули
    bulletsVectors = []          // массив единичных векторов пуль задающих им направления
    
    // зажаты ли кнопки отвечающие за разные действия игрока
    leftDirKey = false;
    rightDirKey = false;
    jumpKey = false
    
    enemies = []            // враги
    enemiesDir = []         // направления движения врагов (stand, left, right)
    enemiesVis = []         // области видимости врагов
    enemiesAngryTime = []   // Если враг увидел игрока, он начинает агриться на него, в этом массиве указано время агра в кадрах
    enemiesMoveTime = []    // Время в кадрах, которое враг двигается в выбранном направлении (по истечению этого времени он снова случайно выбирает направление)
    enemiesHealth = []      // Здоровье врагов
    
    boxes = []      // ящики (их можно перемещать и вставать на них)
    
    mouseX = 0;     // Координаты курсора мыши
    mouseY = 0;
    
    // Шкала здоровья игрока
    healthScale = window.document.createElement('div');
    maxHealthScale = window.document.createElement('div');
    // Сколько еще времени в кадрах будет показываться здоровье игрока
    healthScaleTime = 0;
    
    // шкалы здоровья врагов
    enemyHealthScale = [];
    enemyMaxHealthScale = [];
    // Сколько еще времение в кадрах будет показываться здоровье врагов
    enemyHealthScaleTime = [];
    
    // массив шипов
    spikes = [];

    // Выход в следующий уровень
    let door = null;
}


// быстрая настройка объекта
const quickObjectSetup = (obj, objClass, objWidth, objHeight, x, y, isBlock, isGravityObj, isInertiaObj, isBorder = true) => {
    obj.class = objClass;                                        // Указываем объекту класс
    obj.style.position = 'absolute';                             // Делаем его позицию абсолютной чтобы можно было его перемещать по всему холсту
    obj.style.width = objWidth;                                  // указываем ширину
    obj.style.height = objHeight;                                // указываем высоту
    if (isBorder) obj.style.border = 'thin solid black';         // рамка
    obj.style.left = `${x}px`;                                   // координата по оси x
    obj.style.bottom = `${y}px`;                                 // координата по оси y
    if (isBlock) blocks.push(obj);                               // если объект твердый
    if (isGravityObj) addGravityObject(obj);                     // если у объекта есть гравитация
    if (isInertiaObj) addInertiaObject(obj);                     // Если у объекта есть инерция
    objects.appendChild(obj);
}

// Добавление картинки в контейнер
const addImg = (obj, link, x = 0, y = 0) => {
    let img = document.createElement('img');
    img.src = link;
    if (x != 0 || y != 0) img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.bottom = `${y}px`;
    obj.appendChild(img);
}

// Добавление объектов на холст через карту объектов
const objectPlacement = (objectMap) => {

    let mapX = 0;    // Координаты полученные через карту объектов
    let mapY = 0;    //  ДЛЯ ПОДВИЖНЫХ ОБЪЕКТОВ НАДО СТАВИТЬ mapY + 1!!!! Иначе они могут оказаться внутри стены.
    // Первый цикл для объектов которые на заднем плане
    for (let i = 0; i < objectMap.length; i++) {
        for (let j = 0; j < objectMap[0].length; j++) {
            mapX = j * 40;
            mapY = (objectMap.length - i - 1) * 40
            switch (objectMap[i][j]) {
                case 'e':
                    door = window.document.createElement('div');
                    quickObjectSetup(door, 'door', '30px', '50px', mapX + 5, mapY, false, false, false, false);
                    addImg(door, 'images/door.png')
                    break;
            }
        }
    }
    // Второй цикл для объектов которые на переднем плане
    for (let i = 0; i < objectMap.length; i++) {
        for (let j = 0; j < objectMap[0].length; j++) {
            mapX = j * 40;
            mapY = (objectMap.length - i - 1) * 40
            switch (objectMap[i][j]) {
                case '0':
                    blocks.push(window.document.createElement('div'));
                    quickObjectSetup(blocks[blocks.length - 1], 'block', '40px', '40px', mapX, mapY, true, false, false, false);
                    addImg(blocks[blocks.length - 1], 'images/block.png'); // Помещаем в контейнер блока картинку
                    break;
                case 'p':
                    addImg(objects, 'images/door2.png', mapX + 5, mapY); // Размещаем на месте игрока входную дверь в уровень
                    player = window.document.createElement('div');
                    quickObjectSetup(player, 'player', '30px', '50px', mapX, mapY + 1, true, true, true, false)
                    addImg(player, 'images/player.png')
                    gunImg = document.createElement('img'); // Добавляем спрайт пушки герою
                    gunImg.src = 'images/gun.png';
                    player.appendChild(gunImg);
                    gunImg.style.position = 'absolute';
                    gunImg.style.left = '0px';
                    break;
                case '1':
                    boxes.push(window.document.createElement('div'));
                    quickObjectSetup(boxes[boxes.length - 1], 'box', '50px', '50px', mapX, mapY + 1, true, true, true, false)
                    addImg(boxes[boxes.length - 1], 'images/box.png'); // Помещаем в контейнер ящика картинку
                    break;
                case '2':
                    boxes.push(window.document.createElement('div'));
                    quickObjectSetup(boxes[boxes.length - 1], 'box', '30px', '30px', mapX, mapY + 1, true, true, true, false)
                    addImg(boxes[boxes.length - 1], 'images/box2.png'); // Помещаем в контейнер ящика картинку
                    break;
                case 'r':
                    enemies.push(window.document.createElement('div'));
                    quickObjectSetup(enemies[enemies.length - 1], 'enemy', '40px', '60px', mapX, mapY + 1, true, true, true, false)
                    enemiesDir.push('stand');
                    enemiesVis.push(window.document.createElement('div'));
                    enemiesMoveTime.push(0);
                    quickObjectSetup(enemiesVis[enemiesVis.length - 1], 'enemyVis', '800px', `${Number.parseInt(enemies[enemies.length - 1].style.height) * 2}px`, mapX - 400, mapY, false, false, false, false);
                    enemiesAngryTime.push(0);
                    enemiesHealth.push(8);
                    enemyHealthScale.push(window.document.createElement('div'));
                    enemyMaxHealthScale.push(window.document.createElement('div'));
                    enemyHealthScaleTime.push(0);
                    addImg(enemies[enemies.length - 1], 'images/enemy1.png'); // Помещаем в контейнер врага картинку
                    break;
                case 'R':
                    enemies.push(window.document.createElement('div'));
                    quickObjectSetup(enemies[enemies.length - 1], 'enemy', '100px', '50px', mapX, mapY + 1, true, true, true, false)
                    enemiesDir.push('stand');
                    enemiesVis.push(window.document.createElement('div'));
                    enemiesMoveTime.push(0);
                    quickObjectSetup(enemiesVis[enemiesVis.length - 1], 'enemyVis', '800px', `${Number.parseInt(enemies[enemies.length - 1].style.height) * 2}px`, mapX - 400, mapY, false, false, false, false);
                    enemiesAngryTime.push(0);
                    enemiesHealth.push(20);
                    enemyHealthScale.push(window.document.createElement('div'));
                    enemyMaxHealthScale.push(window.document.createElement('div'));
                    enemyHealthScaleTime.push(0);
                    addImg(enemies[enemies.length - 1], 'images/enemy2.png'); // Помещаем в контейнер врага картинку
                    break;
                case '*':
                    spikes.push(window.document.createElement('div'));
                    quickObjectSetup(spikes[spikes.length - 1], 'spike', '40px', '40px', mapX, mapY, false, false, false, false);
                    addImg(spikes[spikes.length - 1], 'images/spike.png')
                    break;
            }
        }
    }

    // Добавление надписи номера уровня
    let divLevelLable = document.createElement('div');
    divLevelLable.style.position = 'absolute';
    divLevelLable.style.left = `4px`;
    divLevelLable.style.bottom = `660px`;
    divLevelLable.style.background = 'rgba(0, 150, 150, 0.3)';  // Блок немного прозрачный
    divLevelLable.style.color = 'white';                        // делаем текст белым
    divLevelLable.style.width = '50px';
    divLevelLable.style.height = '50px';
    divLevelLable.style.overflow = 'hidden';         // Чтобы дочерние элементы не были видны за границами блока
    divLevelLable.style.borderRadius = '50%';        // Чтобы углы блока были округлены
    divLevelLable.style.border = '2px solid blue';   // Делаем рамку
    divLevelLable.textContent = `${level}`;          // Добавляем номер уровня в качестве надписи на блок
    divLevelLable.style.fontSize = '25px';

    divLevelLable.style.display = 'flex';            // Добавляем блоку способ позиционирования flexbox, чтобы можно было настроить расположение текста в нём
    divLevelLable.style.justifyContent = 'center';   // Выравниваем расположение текста внутри блока по горизонтали и вертикали
    divLevelLable.style.alignItems = 'center';
    objects.appendChild(divLevelLable);

    // добавление надписи числа смертей
    objects.appendChild(numDead);
}

// Процедура настройки интерфейса
const addInterface = () => {
    // Настройка здоровья игрока
    quickObjectSetup(healthScale, 'healthScale', `${playerHealth * 5}px`, '10px', Number.parseInt(player.style.left) - 10, Number.parseInt(player.style.bottom) + Number.parseInt(player.style.height) + 10, false, false, false, false)
    quickObjectSetup(maxHealthScale, 'healthScale', `${playerHealth * 5}px`, '10px', Number.parseInt(player.style.left) - 10, Number.parseInt(player.style.bottom) + Number.parseInt(player.style.height) + 10, false, false, false, false)
    healthScale.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    maxHealthScale.style.backgroundColor = 'rgba(255, 99, 71, 0.3)';
    healthScale.style.display = 'none';      // Скрываем шкалу здоровья игрока
    maxHealthScale.style.display = 'none';
    // Настройка здоровья врагов
    for (let i = 0; i < enemies.length; i++) {
        quickObjectSetup(enemyHealthScale[i], 'enemyHealthScale', `${enemiesHealth[i] * 5}px`, '10px', Number.parseInt(enemies[i].style.left) - 10, Number.parseInt(enemies[i].style.bottom) + Number.parseInt(enemies[i].style.height) + 10, false, false, false, false)
        quickObjectSetup(enemyMaxHealthScale[i], 'enemyHealthScale', `${enemiesHealth[i] * 5}px`, '10px', Number.parseInt(enemies[i].style.left) - 10, Number.parseInt(enemies[i].style.bottom) + Number.parseInt(enemies[i].style.height) + 10, false, false, false, false)
        enemyHealthScale[i].style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        enemyMaxHealthScale[i].style.backgroundColor = 'rgba(255, 99, 71, 0.3)';
        enemyHealthScale[i].style.display = 'none'; 
        enemyMaxHealthScale[i].style.display = 'none';
    }

}

// Процедура Обновление интерфейса
const interfaceUpdate = () => {
    // Обновление шкалы здоровья игрока
    healthScale.style.width = `${playerHealth * 5}px`
    healthScale.style.left = `${Number.parseInt(player.style.left) - 10}px`
    healthScale.style.bottom = `${Number.parseInt(player.style.bottom) + Number.parseInt(player.style.height) + 10}px`
    maxHealthScale.style.left = `${Number.parseInt(player.style.left) - 10}px`
    maxHealthScale.style.bottom = `${Number.parseInt(player.style.bottom) + Number.parseInt(player.style.height) + 10}px`

    if (healthScaleTime > 0) {
        healthScale.style.display = 'block';      // Показываем шкалу здоровья игрока
        maxHealthScale.style.display = 'block';
        healthScaleTime--;
    }
    else {
        healthScale.style.display = 'none';      // Скрываем шкалу здоровья игрока
        maxHealthScale.style.display = 'none';
    }

    // Обновление шкалы здоровья врагов
    for (let i = 0; i < enemies.length; i++) {
        enemyHealthScale[i].style.width = `${enemiesHealth[i] * 5}px`;
        enemyHealthScale[i].style.left = `${Number.parseInt(enemies[i].style.left)}px`
        enemyHealthScale[i].style.bottom = `${Number.parseInt(enemies[i].style.bottom) + Number.parseInt(enemies[i].style.height) + 10}px`
        enemyMaxHealthScale[i].style.left = `${Number.parseInt(enemies[i].style.left)}px`
        enemyMaxHealthScale[i].style.bottom = `${Number.parseInt(enemies[i].style.bottom) + Number.parseInt(enemies[i].style.height) + 10}px`

        if (enemyHealthScaleTime[i] > 0) {
            enemyHealthScale[i].style.display = 'block';      // Показываем шкалу здоровья врага
            enemyMaxHealthScale[i].style.display = 'block';
            enemyHealthScaleTime[i]--;
        }
        else {
            enemyHealthScale[i].style.display = 'none';
            enemyMaxHealthScale[i].style.display = 'none';
        }
    }
}

// Пересекаются ли два объекта (параметры: ширина, высота, координаты объектов)
// Отслеживание пересечений через ширину, высоту, координаты
const valueSquaresIntersection = (sq1wid, sq1heig, sq1x1, sq1y1, sq2wid, sq2heig, sq2x1, sq2y1) => {
    // правая верхняя точка первого квадрата
    let sq1x2 = sq1x1 + sq1wid
    let sq1y2 = sq1y1 + sq1heig

    // правая верхняя точка второго квадрата
    let sq2x2 = sq2x1 + sq2wid
    let sq2y2 = sq2y1 + sq2heig

    // Левая нижняя точка первого квадрата лежит во втором квадрате
    if ((sq1x1 >= sq2x1 && sq1x1 <= sq2x2) && (sq1y1 >= sq2y1 && sq1y1 <= sq2y2)) return true;
    // правая верхняя точка первого квадрата лежит во втором квадрате
    if ((sq1x2 >= sq2x1 && sq1x2 <= sq2x2) && (sq1y2 >= sq2y1 && sq1y2 <= sq2y2)) return true;
    // левая верхняя точка первого квадрата лежит во втором квадрате
    if ((sq1x1 >= sq2x1 && sq1x1 <= sq2x2) && (sq1y2 >= sq2y1 && sq1y2 <= sq2y2)) return true;
    // правая нижняя точка первого квадрата лежит во втором квадрате
    if ((sq1x2 >= sq2x1 && sq1x2 <= sq2x2) && (sq1y1 >= sq2y1 && sq1y1 <= sq2y2)) return true;

    // Левая нижняя точка второго квадрата лежит в первом квадрате
    if ((sq2x1 >= sq1x1 && sq2x1 <= sq1x2) && (sq2y1 >= sq1y1 && sq2y1 <= sq1y2)) return true;
    // правая верхняя точка второго квадрата лежит в первом квадрате
    if ((sq2x2 >= sq1x1 && sq2x2 <= sq1x2) && (sq2y2 >= sq1y1 && sq2y2 <= sq1y2)) return true;
    // левая верхняя точка второго квадрата лежит в первом квадрате
    if ((sq2x1 >= sq1x1 && sq2x1 <= sq1x2) && (sq2y2 >= sq1y1 && sq2y2 <= sq1y2)) return true;
    // правая нижняя точка второго квадрата лежит в первом квадрате
    if ((sq2x2 >= sq1x1 && sq2x2 <= sq1x2) && (sq2y1 >= sq1y1 && sq2y1 <= sq1y2)) return true;

    // Ситуация: крест. Когда квадраты пересекаются, но ни одна точка не лежит внутри другого квадрата
    if ((sq2x2 > sq1x2 &&  sq2y2 < sq1y2) && (sq2x1 < sq1x1 && sq2y1 > sq1y1)) return true;
    if ((sq1x2 > sq2x2 &&  sq1y2 < sq2y2) && (sq1x1 < sq2x1 && sq1y1 > sq2y1)) return true;


    return false;
}
// Отслеживание пересечений через ссылки на объекты
const linkSquaresIntersection = (object1, object2) => {
    // Объект не может пересекать самого себя
    if (object1 === object2) return false;

    // ширина и высота первого квадрата
    let sq1wid = parseInt(object1.style.width)
    let sq1heig = parseInt(object1.style.height)

    // ширина и высота второго квадрата
    let sq2wid = parseInt(object2.style.width)
    let sq2heig = parseInt(object2.style.height)

    // левая нижняя точка первого квадрата
    let sq1x1 = Number.parseInt(object1.style.left)
    let sq1y1 = Number.parseInt(object1.style.bottom)

    // левая нижняя точка второго квадрата
    let sq2x1 = Number.parseInt(object2.style.left)
    let sq2y1 = Number.parseInt(object2.style.bottom)

    return valueSquaresIntersection(sq1wid, sq1heig, sq1x1, sq1y1, sq2wid, sq2heig, sq2x1, sq2y1)
}

// Функция для организации движения твёрдых объектов
// Если type = 'push', то функция толкает object в направлении direction на расстояние power, при этом он может врезаться в твёрдый неподвижный объект
// Если type = 'check', power = 1, то функция проверяет присланился ли object к твёрдому неподвижному объекту со стороны direction
// Если type = 'check', power > 1, то функция проверяет есть ли на расстоянии power от object в направлении direction твёрдый неподвижный объект
// Если type = 'checkLink, то тоже самое что type = 'check', но вернет ссылку на объект к к-му присланился наш объект на расстоянии power, либо false

const objectPushing = (object, direction, power, type = 'push') => {
    // Предполагаемые координаты объекта после толчка (если он ни с чем не столкнётся)
    let allegedX = Number.parseInt(object.style.left)
    let allegedY = Number.parseInt(object.style.bottom)

    switch (direction) {
        case 'right':
            allegedX += power;
            break;
        case 'left':
            allegedX -= power;
            break;  
        case 'up':
            allegedY += power;
            break;
        case 'down':
            allegedY -= power;
            break;
    }

    let collision = false; // произойдёт ли столкновение после толчка
    let index = -1;        // индекс объекта с к-м столкнётся наш объект после толчка

    let intersectionObjects = [] // Массив объектов с которыми наш объект пересекся
    let C = null;                   // координата самого близкого объекта с к-м мы пересеклись 

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === object) continue; // Не будем рассматривать пересечение объектом самого себя
        if (
            valueSquaresIntersection(
                Number.parseInt(object.style.width),
                Number.parseInt(object.style.height),
                allegedX,
                allegedY,
                Number.parseInt(blocks[i].style.width),
                Number.parseInt(blocks[i].style.height),
                Number.parseInt(blocks[i].style.left),
                Number.parseInt(blocks[i].style.bottom)
            )
        ) {
            collision = true;
            if (type === 'check') break; // нам незачем смотреть остальные объекты если мы просто проверяем
            intersectionObjects.push(blocks[i])
        }
    }

    if (collision) {
        if (type === 'check') return true;
        // В зависимости от направления движения выбираем самый близкий объект с к-м мы столкнулись
        index = blocks.indexOf(intersectionObjects[0])
        switch (direction) {
            case 'right':
                C = Number.parseInt(intersectionObjects[0].style.left)
                for (let i = 0; i < intersectionObjects.length; i++) {
                    if (Number.parseInt(intersectionObjects[i].style.left) < C) {
                        C = Number.parseInt(intersectionObjects[i].style.left);
                        index = blocks.indexOf(intersectionObjects[i])
                    }
                }
                break;
            case 'left':
                С = Number.parseInt(intersectionObjects[0].style.left)
                for (let i = 0; i < intersectionObjects.length; i++) {
                    if (Number.parseInt(intersectionObjects[i].style.left) > C) {
                        C = Number.parseInt(intersectionObjects[i].style.left);
                        index = blocks.indexOf(intersectionObjects[i])
                    }
                }
                break;  
            case 'up':
                C = Number.parseInt(intersectionObjects[0].style.bottom)
                for (let i = 0; i < intersectionObjects.length; i++) {
                    if (Number.parseInt(intersectionObjects[i].style.bottom) < C) {
                        C = Number.parseInt(intersectionObjects[i].style.bottom);
                        index = blocks.indexOf(intersectionObjects[i])
                    }
                }
                break;
            case 'down':
                C = Number.parseInt(intersectionObjects[0].style.bottom)
                for (let i = 0; i < intersectionObjects.length; i++) {
                    if (Number.parseInt(intersectionObjects[i].style.bottom) > C) {
                        C = Number.parseInt(intersectionObjects[i].style.bottom);
                        index = blocks.indexOf(intersectionObjects[i])
                    }
                }
                break;
        }
        // Возвращаем ссылку на объект если указан нужный тип
        if (type === 'checkLink') {
            return blocks[index];
        }

        // Если столкнувшиеся боком объекты обладают инерцией, то она передается от того кто толкнул тому кого толкнули
        if (inertiaObjects.indexOf(object) != -1 && inertiaObjects.indexOf(blocks[index]) != -1 && (direction === 'right' || direction === 'left')) {
            inertialEnergyObjects[inertiaObjects.indexOf(blocks[index])] = inertialEnergyObjects[inertiaObjects.indexOf(object)];
        }
        else if (inertiaObjects.indexOf(object) != -1 && inertiaObjects.indexOf(blocks[index]) === -1 && (direction === 'right' || direction === 'left')) {
            inertialEnergyObjects[inertiaObjects.indexOf(object)] = 0;
        }
        switch (direction) {
            case 'right':
                object.style.left = `${Number.parseInt(blocks[index].style.left) - Number.parseInt(object.style.width) - 1}px`
                break;
            case 'left':
                object.style.left = `${Number.parseInt(blocks[index].style.left) + Number.parseInt(blocks[index].style.width) + 1}px`
                break;  
            case 'up':
                object.style.bottom = `${Number.parseInt(blocks[index].style.bottom) - Number.parseInt(object.style.height) - 1}px`
                break;
            case 'down':
                object.style.bottom = `${Number.parseInt(blocks[index].style.bottom) + Number.parseInt(blocks[index].style.height) + 1}px`
                break;
        }
    } else {
        if (type === 'check' || type === 'checkLink') return false;
        if (direction == 'right' || direction == 'left') object.style.left = `${allegedX}px`;
        else if (direction == 'down' || direction == 'up') object.style.bottom = `${allegedY}px`;
    }

}

// Добавление объекта в массив объектов с гравитацией (теперь у него есть скорость падения)
const addGravityObject = (object) => {
    gravityObjects.push(object);
    speedFallingObjects.push(0);
    isFallingObjects.push(false);
}

// Процедура описывающая поведение объектов с гравитацией
const actionsGravityObjects = () => {
    for (let i = 0; i < gravityObjects.length; i++) {
        // Если объект падает и его скорость падения меньше максимальной, то скорость растет
        if (speedFallingObjects[i] < 30 && isFallingObjects[i]) speedFallingObjects[i] += 4;

        // объект летит вниз если скорость падения положительная, летит вверх если скорость падения отрицательная
        if (speedFallingObjects[i] > 0) {
            objectPushing(gravityObjects[i], 'down', speedFallingObjects[i])
        }
        else if (speedFallingObjects[i] < 0) objectPushing(gravityObjects[i], 'up', -speedFallingObjects[i])

        // Если объект не падает и под ним ничего нет, то он падает. 
        if (!isFallingObjects[i] && !objectPushing(gravityObjects[i], 'down', 1, 'check')) {
            isFallingObjects[i] = true;
        }
        // Если объект падает и под ним что-то есть, то он не падает
        if (isFallingObjects[i] && objectPushing(gravityObjects[i], 'down', 1, 'check')) {
            isFallingObjects[i] = false;
            speedFallingObjects[i] = 0;
        }
        // Если объект врезается в потолок, то падает
        if (isFallingObjects[i] && objectPushing(gravityObjects[i], 'up', 1, 'check')) {
            speedFallingObjects[i] = 0;
        }
    }
}

// Добавление объекта в массив объектов с инерцией
const addInertiaObject = (object) => {
    inertiaObjects.push(object);
    inertialEnergyObjects.push(0);
}

// Процедура описывающая поведение объектов с инерцией
const actionInertiaObjects = () => {
    for (let i = 0; i < inertiaObjects.length; i++) {
        // Инерционная энергия со временем сама по себе пропадает
        // Двигаем объект в зависимости от его инерционной энергии
        if (inertialEnergyObjects[i] > 0) {
            inertialEnergyObjects[i] -= 3;
            if (inertialEnergyObjects[i] < 0) inertialEnergyObjects[i] = 0;
            if (inertialEnergyObjects[i] > 0) objectPushing(inertiaObjects[i], 'right', inertialEnergyObjects[i]);
        }
        else if (inertialEnergyObjects[i] < 0) {
            inertialEnergyObjects[i] += 3;
            if (inertialEnergyObjects[i] > 0) inertialEnergyObjects[i] = 0;
            if (inertialEnergyObjects[i] < 0) objectPushing(inertiaObjects[i], 'left', -inertialEnergyObjects[i])
        }
    }
}

// процедура описывающая создание, движение и столкновение пуль
const bulletProcedure = () => {
    // Создание пули
    if (isShooting && reload <= 0) {
        reload = RELOAD_TIME;  // Перезарядка
        // Координаты в к-х появится пуля (в центре квадрата игрока)
        let bulletX = Number.parseInt(player.style.left) + Math.floor(Number.parseInt(player.style.width) / 2);
        let bulletY = Number.parseInt(player.style.bottom) + Math.floor(Number.parseInt(player.style.height) / 2);
        bullets.push(window.document.createElement('div'));
        quickObjectSetup(bullets[bullets.length - 1], 'bullet', BULLET_SIZE, BULLET_SIZE, bulletX, bulletY, false, false, false, false);
        // Узнаем значения единичного вектора направления
        // Катеты прямоугольного треугольника, гипотенуза к-го отрезок от курсора до игрока (центра квадрата игрока)
        let catetX = mouseX - bulletX;
        let catetY = mouseY - bulletY;
        let hypotenuse = Math.sqrt(catetX*catetX + catetY*catetY)   // Находим длину этой гипотенузы
        bulletsVectors.push([catetX/hypotenuse, catetY/hypotenuse]) // Добавляем единичный вектор задающий направление полета пули
        addImg(bullets[bullets.length - 1], 'images/bullet.png'); // Добавляем пуле картинку
    } 
    if(reload > 0) reload--;
    // Движение пуль
    for (let i = 0; i < bulletsVectors.length; i++) {
        bullets[i].style.left = `${Number.parseInt(bullets[i].style.left) + Math.floor(bulletsVectors[i][0] * BULLETS_SPEED)}px`;
        bullets[i].style.bottom = `${Number.parseInt(bullets[i].style.bottom) + Math.floor(bulletsVectors[i][1] * BULLETS_SPEED)}px`;
    }
    // Уничтожение пуль
    for (let i = 0; i < bullets.length; i++) {
        // Уничтожение при столкновении с твердым объектом (кроме игрока)
        for (let j = 0; j < blocks.length; j++) {
            // Пуля выпущенная игроком не может с ним столкнуться
            if (blocks[j] === player) continue;
            if (linkSquaresIntersection(bullets[i], blocks[j])) {
                // Если пуля попадает в объект с инерцией, то она отталкивает его
                if (inertiaObjects.indexOf(blocks[j]) != -1) {
                    inertialEnergyObjects[inertiaObjects.indexOf(blocks[j])] = Math.floor(bulletsVectors[i][0] * 7);
                }
                // Если пуля врезается во врага, то она уменьшает его здоровье и агрит его
                if (enemies.indexOf(blocks[j]) != -1) {
                    // Здоровье врага уменьшается
                    enemiesHealth[enemies.indexOf(blocks[j])]--;
                    // Враг агрится
                    enemiesAngryTime[enemies.indexOf(blocks[j])] = 50;
                    // У врага показывается его здововье шкалой
                    enemyHealthScaleTime[enemies.indexOf(blocks[j])] = 100;
                }
                objects.removeChild(bullets[i])
                bullets.splice(i, 1)
                bulletsVectors.splice(i, 1)
                break;
            }
        }
    }
}

// Функция для генерации случайного целого числа от min до max
const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

// процедура описывающая поведение врагов
enemiesProcedure = () => {
    for (let i = 0; i < enemies.length; i++) {
        // Области видимости врагов находятся там же где и враги
        enemiesVis[i].style.left = `${Number.parseInt(enemies[i].style.left) - Number.parseInt(enemiesVis[i].style.width) / 2}px`
        enemiesVis[i].style.bottom = enemies[i].style.bottom;

        // Враг выбирает себе новое направление если время движени в прошлом направлении закончено
        if (enemiesMoveTime[i] <= 0) {
            // Сколько кадров будет двигаться враг
            enemiesMoveTime[i] = randomInteger(15, 25 * 3);
            // Случайно выбираем новое направление врага (враг с большим шансом будет стоять чем куда-то идти)
            let randomN = randomInteger(1, 5);
            if (randomN === 1) enemiesDir[i] = 'right';
            else if (randomN === 2) enemiesDir[i] = 'left';
            else enemiesDir[i] = 'stand';
        }
        
        // Двигаем врага добавляя ему инерции в нужном направлении (если его инерция не равна максимальной, т.е. 20)
        if (enemiesDir[i] === 'left' && inertialEnergyObjects[inertiaObjects.indexOf(enemies[i])] > -10) {
            inertialEnergyObjects[inertiaObjects.indexOf(enemies[i])] -= 4;
        } else if (enemiesDir[i] === 'right' && inertialEnergyObjects[inertiaObjects.indexOf(enemies[i])] < 10) {
            inertialEnergyObjects[inertiaObjects.indexOf(enemies[i])] += 4;
        } else if (enemiesDir[i] === 'stand') {
            inertialEnergyObjects[inertiaObjects.indexOf(enemies[i])] = 0;
        }

        // Враг будет менять направление на противоположное или прыгать (в случае если он на твердом объекте) если он столкнулся с твердым объектом сбоку (если враг не агрится)
        if (objectPushing(enemies[i], 'left', 1, 'check') && enemiesAngryTime[i] <= 0) {
            let jumpOrChangeDir = randomInteger(1, 3); // Враг будет прыгать или менять направление
            if (jumpOrChangeDir === 1 && !isFallingObjects[gravityObjects.indexOf(enemies[i])]) {
                speedFallingObjects[gravityObjects.indexOf(enemies[i])] = -randomInteger(25, 35)
                isFallingObjects[gravityObjects.indexOf(enemies[i])] = true;
            } else {
                enemiesDir[i] = 'right';
            }
        }
        else if (objectPushing(enemies[i], 'right', 1, 'check') && enemiesAngryTime[i] <= 0) {
            let jumpOrChangeDir = randomInteger(1, 3); // Враг будет прыгать или менять направление
            if (jumpOrChangeDir === 1 && !isFallingObjects[gravityObjects.indexOf(enemies[i])]) {
                speedFallingObjects[gravityObjects.indexOf(enemies[i])] = -randomInteger(25, 35)
                isFallingObjects[gravityObjects.indexOf(enemies[i])] = true;
            } else {
                enemiesDir[i] = 'left';
            }
        }
        // Время движения кончается если враг не агрится
        if (enemiesAngryTime[i] <= 0) enemiesMoveTime[i]--;

        // Если игрок попал в область видимости врага, то враг его видит
        if (linkSquaresIntersection(enemiesVis[i], player)) {
            enemiesAngryTime[i] = 100;
        }

        // Если враг агрится, то время агра уменьшается
        if (enemiesAngryTime[i] > 0) enemiesAngryTime[i]--;

        // Враг двигается в сторону игрока если агрится
        if (enemiesAngryTime[i] > 0) {
            // Если враг справа от игрока, то он двигается вправо, иначе влево
            if (Number.parseInt(player.style.left) < Number.parseInt(enemies[i].style.left)) enemiesDir[i] = 'left';
            else enemiesDir[i] = 'right';
            // Если враг под игроком или враг врезался в стену, и при этом он на твердом теле, то он прыгает
            if ((Number.parseInt(player.style.bottom) > Number.parseInt(enemies[i].style.bottom) + 160 || objectPushing(enemies[i], 'left', 1, 'check') || objectPushing(enemies[i], 'right', 1, 'check')
            ) && !isFallingObjects[gravityObjects.indexOf(enemies[i])]) {
                speedFallingObjects[gravityObjects.indexOf(enemies[i])] = -randomInteger(25, 35)
                isFallingObjects[gravityObjects.indexOf(enemies[i])] = true;
            }
        }

        // Враг умирает если его здоровье меньше или равно нулю
        if (enemiesHealth[i] <= 0) {
            objects.removeChild(enemies[i]);
            // удаляем врага из массивов гравитационных объектов
            isFallingObjects.splice(gravityObjects.indexOf(enemies[i]), 1)
            speedFallingObjects.splice(gravityObjects.indexOf(enemies[i]), 1)
            gravityObjects.splice(gravityObjects.indexOf(enemies[i]), 1)
            // удаляем врага из массивов инерционных объектов
            inertialEnergyObjects.splice(inertiaObjects.indexOf(enemies[i]), 1)
            inertiaObjects.splice(inertiaObjects.indexOf(enemies[i]), 1)
            // Удаляем врага из массивов твёрдых объектов
            blocks.splice(blocks.indexOf(enemies[i]), 1)
            // удаляем здоровье врага из всех массивов и удаляем сами объекты
            objects.removeChild(enemyHealthScale[i]);
            objects.removeChild(enemyMaxHealthScale[i]);
            enemyHealthScale.splice(i, 1);
            enemyMaxHealthScale.splice(i, 1);
            enemyHealthScaleTime.splice(i, 1);
            // Удаляем врага из своих массивов
            enemies.splice(i, 1)
            enemiesAngryTime.splice(i, 1)
            enemiesDir.splice(i, 1)
            enemiesHealth.splice(i, 1)
            enemiesMoveTime.splice(i, 1)
            objects.removeChild(enemiesVis[i]);     // Не забываем удалить с холста квадрат области видимости врага
            enemiesVis.splice(i, 1)
            
        }
    }
}

// ОБРАБОТКА СОБЫТИЙ

// Нажатия на клавиши

// нажатие и отпускание кнопок на клавиатуре
document.addEventListener('keydown', function(event) {
    // в зависимости от зажатой или отпущенной клавиши меняем направление игрока
    if (event.code === 'KeyA') leftDirKey = true;
    else if (event.code === 'KeyD') rightDirKey = true;
    // Если повторный сигнал от уже зажатой кнопки
    if (event.repeat) return;
    if (event.code === 'KeyW') jumpKey = true
})
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') leftDirKey = false;
    else if (event.code === 'KeyD') rightDirKey = false;
    if (event.code === 'KeyW') jumpKey = false;
})

// Функция срабатывает когда курсор двигается в пределах холста
canvas.addEventListener('mousemove', function(event) {
    // Когда мышь двигается, обновляем ее координаты
    // Вычитаем отступ холста от краёв страницы, из оси x вычитаем высоту холста чтобы начало координат было слева снизу
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = -(event.clientY - canvas.offsetTop - 720);

    // Поворот пушки в зависимости от расположения курсора на холсте
    if (gunImg != null) {
        let catetX = mouseX - Number.parseInt(player.style.left);
        let catetY = mouseY - Number.parseInt(player.style.bottom);        // Находим катеты и гипотенузу чтобы получить синус
        if (catetX > 0) {    // Танцы с бубном и углами ради того чтобы пушка поворачивалась нормально
            expr = -1;
            rot = 180;
        } else {
            expr = 1;
            rot = 0;
        }
        let hypotenuse = Math.sqrt(catetX*catetX + catetY*catetY)
        gunImg.style.transform = `rotate(${(Math.asin(catetY/hypotenuse) * 57 + rot) * expr}deg)`; // Умножаем радианы на 57 чтобы получить градусы
    }
})

// нажатие и отпускание кнопки мыши в пределах холста
canvas.addEventListener('mousedown', function (event) {
    isShooting = true; 
})

canvas.addEventListener('mouseup', function(event) {
    isShooting = false;
})

// отслеживаем движения объектов каждые 40 мсек (25 ФПС)
objectsMovement = setInterval(() => {
    // Инерционная энергия игрока меняется в зависимости от нажатой клавиши (если она не достигла максимального значения)
    if (leftDirKey && inertialEnergyObjects[inertiaObjects.indexOf(player)] > -15) inertialEnergyObjects[inertiaObjects.indexOf(player)] -= 5
    else if (rightDirKey && inertialEnergyObjects[inertiaObjects.indexOf(player)] < 15) inertialEnergyObjects[inertiaObjects.indexOf(player)] += 5

    // Если зажата клавиша прыжка то мы совершаем один прыжок
    if (jumpKey) {
        playerIsJumping = true;
        jumpKey = false;
    }

    // Если игрок падает, то прыжка не будет. В ином случае его скорость падения становится отрицательной и он начинает падать
    if (playerIsJumping) {
        if (!isFallingObjects[gravityObjects.indexOf(player)]) {
            speedFallingObjects[gravityObjects.indexOf(player)] = -40;
            isFallingObjects[gravityObjects.indexOf(player)] = true;
        }
        playerIsJumping = false;
    }

    // процедура описывающая поведение врагов
    enemiesProcedure();
    // процедура описывающая создание, движение и столкновение пуль
    bulletProcedure();
    // процедура описывающая поведение объектов с гравитацией
    actionsGravityObjects();
    // процедура описывающая поведение объектов с инерцией
    actionInertiaObjects();
    // процедура описывающая обновление интерфейса
    interfaceUpdate();

    // Враг наносит урон игроку если сталкивается с ним
    if (enemies.indexOf(objectPushing(player, 'up', 1, 'checkLink')) != -1 || enemies.indexOf(objectPushing(player, 'left', 1, 'checkLink')) != -1 ||
    enemies.indexOf(objectPushing(player, 'down', 1, 'checkLink')) != -1 || enemies.indexOf(objectPushing(player, 'right', 1, 'checkLink')) != -1)
    {
        if (playerInvTime <= 0) {
            playerHealth--;            // Игрок получит урон только если его время неуязвимости уже прошло
            playerInvTime = 2;
        }
        healthScaleTime = 100;
    }
    // Шипы наносят урон игроку если он находится в них
    for (let i = 0; i < spikes.length; i++) {
        if (linkSquaresIntersection(player, spikes[i])) {
            if (playerInvTime <= 0) {
                playerHealth -= 2;
                playerInvTime = 3;
            }
            healthScaleTime = 100;
        }
    }

    if (playerInvTime > 0) playerInvTime--;  // Уменьшаем время неуязвимости игрока если оно положительно

    // Если игрок теряет всё здоровье, то уровень перезапускается
    if (playerHealth <= 0) {
        countDead++;                           // Увеличиваем на 1 счетчик смертей
        numDead.textContent = `${countDead}`;
        playerHealth = PLAYER_MAX_HEALTH;
        clearObjects();
        objectPlacement(levels[level - 1]);
        addInterface();
    }
    // Если игрок доходит до двери, то переходит на следующий уровень (Если конечно этот уровень существует, иначе игрок просто перезапускает уровень)
    if (linkSquaresIntersection(player, door)) {
        if (level < levels.length) level++;
        playerHealth = PLAYER_MAX_HEALTH;
        clearObjects();
        objectPlacement(levels[level - 1]);
        addInterface();
    }

}, 40)
objectPlacement(levels[level - 1]);   // Размещаем объекты уровня
addInterface();                       // Добавляем интерфейс