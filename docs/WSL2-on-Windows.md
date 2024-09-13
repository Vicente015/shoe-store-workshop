Para tener `make` disponible en Windows utilizando WSL2 (Windows Subsystem for Linux 2), debes seguir estos pasos para instalar las herramientas necesarias:

### Paso 1: Instalar WSL2 (si aún no lo tienes)
1. Abre PowerShell como administrador y ejecuta el siguiente comando para instalar WSL:
   ```bash
   wsl --install
   ```
   Esto instalará WSL junto con una distribución de Linux predeterminada (normalmente Ubuntu).

2. Reinicia tu computadora si es necesario.

### Paso 2: Instalar una distribución de Linux (si es necesario)
- Si WSL no instaló automáticamente una distribución, puedes hacerlo manualmente. Para instalar Ubuntu, por ejemplo, ejecuta:
  ```bash
  wsl --install -d Ubuntu
  ```

### Paso 3: Abrir la terminal de WSL
- Abre la terminal de WSL escribiendo `wsl` en el menú de inicio o seleccionando la distribución instalada (por ejemplo, "Ubuntu").

### Paso 4: Actualizar los paquetes del sistema
- Una vez en la terminal de WSL, actualiza la lista de paquetes y las herramientas del sistema:
  ```bash
  sudo apt update
  sudo apt upgrade -y
  ```

### Paso 5: Instalar `make`
- Instala el paquete `make` (parte de las herramientas de desarrollo de GNU) usando el siguiente comando:
  ```bash
  sudo apt install build-essential
  ```
  Este paquete incluye `make` y otros compiladores y herramientas necesarias para construir software desde el código fuente.

### Paso 6: Verificar la instalación de `make`
- Puedes verificar que `make` esté correctamente instalado ejecutando:
  ```bash
  make --version
  ```
  Deberías ver la versión de `make` instalada.

### Paso 7: Usar `make`
- Ahora `make` estará disponible para usar en tu entorno de WSL2 y podrás compilar proyectos que lo requieran desde la terminal de Linux en Windows.

Este proceso te permitirá usar `make` en cualquier proyecto dentro del entorno WSL2.
