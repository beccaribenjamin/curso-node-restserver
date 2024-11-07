
const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 letras').isLength({min:6}),
    //Check del correo valido
    check('correo', 'El correo no es valido').isEmail(),
    //Check custom , comprobar que no existe un user con el correo
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    validarJWT,
    // esAdminRole, //--->>>Este me sirve para validar que solo usuario con admin role pueda hacer delete
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'), //--->>>Este me sirve para validar que solo con ciertos roles puedan hacer delete
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete);


module.exports = router;