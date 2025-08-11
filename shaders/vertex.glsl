#version 300 es

in vec4 a_position;
in vec4 a_color;
uniform mat4 u_transformation;

out vec4 v_color;

void main() {
    gl_Position = u_transformation * a_position;
    vec4 shade = vec4(gl_Position.z / 200.0, gl_Position.z / 200.0, gl_Position.z / 200.0, 0.0 );
    vec4 fade = vec4(0, 0, 0, gl_Position.z / -20.0 );
    v_color = a_color + shade + fade;
}