const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
  } = require("graphql");
  
  const Comentario = require("./models/comentarioModel");

  const ComentarioType = new GraphQLObjectType({
    name: "Comentario",
    fields: () => ({
      id_comentario: { type: GraphQLInt },
      comentario: { type: GraphQLString },
      documento_id_documento: { type: GraphQLInt },
      fecha: { type: GraphQLString },
      isdeleted: { type: GraphQLBoolean },
      publicado: { type: GraphQLBoolean }
    }),
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      comentarios: {
        type: new GraphQLList(ComentarioType),
        resolve: async () => {
          return await Comentario.findAll({ where: { isdeleted: false } });
        }
      },
      comentario: {
        type: ComentarioType,
        args: { id: { type: GraphQLInt } },
        resolve: async (_, { id }) => {
          return await Comentario.findByPk(id);
        }
      }
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      agregarComentario: {
        type: ComentarioType,
        args: {
          comentario: { type: GraphQLString },
          documento_id_documento: { type: GraphQLInt },
          fecha: { type: GraphQLString },
          publicado: { type: GraphQLBoolean }
        },
        resolve: async (_, args) => {
          return await Comentario.create({
            comentario: args.comentario,
            documento_id_documento: args.documento_id_documento,
            fecha: args.fecha,
            isdeleted: false,
            publicado: args.publicado
          });
        }
      },
      actualizarComentario: {
        type: ComentarioType,
        args: {
          id_comentario: { type: GraphQLInt },
          comentario: { type: GraphQLString },
          publicado: { type: GraphQLBoolean }
        },
        resolve: async (_, args) => {
          const comentario = await Comentario.findByPk(args.id_comentario);
          if (!comentario || comentario.isdeleted) return null;
      
          comentario.comentario = args.comentario ?? comentario.comentario;
          comentario.publicado = args.publicado ?? comentario.publicado;
      
          await comentario.save();
          return comentario;
        }
      },
      eliminarComentario: {
        type: ComentarioType,
        args: {
          id_comentario: { type: GraphQLInt }
        },
        resolve: async (_, args) => {
          const comentario = await Comentario.findByPk(args.id_comentario);
          if (!comentario || comentario.isdeleted) return null;
      
          comentario.isdeleted = true;
          await comentario.save();
          return comentario;
        }
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });