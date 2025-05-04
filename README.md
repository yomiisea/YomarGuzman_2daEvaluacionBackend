Microservicio: Comentarios sobre Documentos
Tecnología: GraphQL
Justificación
Los comentarios están fuertemente relacionados con los documentos, por lo que necesitamos acceder a ellos de forma conjunta y eficiente.
GraphQL es ideal cuando se necesita obtener estructuras de datos relacionadas (por ejemplo: documento → comentarios) en una sola consulta, sin realizar múltiples llamadas REST.
Además, permite exponer una API pública que puede ser consultada desde el frontend usando axios, fetch, o HttpClient.

Funcionalidades del microservicio
-query comentarios: lista todos los comentarios no eliminados.
-query comentario(id_comentario): obtiene un solo comentario por su ID.
-mutation agregarComentario(comentarioInput): permite registrar un nuevo comentario.
-mutation eliminarComentario(id_comentario): realiza un borrado lógico del comentario.

Cómo correr el microservicio
1. Clona el repositorio
bash
Copiar
Editar
git clone 
cd repo

2.Importar la base de datos en PostgreSQL
Entra a pgAdmin o usa la terminal psql.
Carga el archivo SQL que se encuentra en la raíz del proyecto (por ejemplo: MIGADB.sql).
sql
Copiar
Editar
-- En psql

3. Instalar dependencias
Desde la raíz del proyecto, ejecuta:

bash
Copiar
Editar
npm install

4. Iniciar el servidor
bash
Copiar
Editar
node index.js
El microservicio estará corriendo en:

bash
Copiar
Editar
http://localhost:4000/graphql
Ahí se puede utilizar la interfaz GraphiQL para hacer consultas y pruebas interactivas.
