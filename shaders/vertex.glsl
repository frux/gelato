#version 300 es

in vec4 a_position;
uniform mat4 u_transformation;

void main() {
    gl_Position = u_transformation * a_position;
}