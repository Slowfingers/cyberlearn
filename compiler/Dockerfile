FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends gcc-avr avr-libc arduino-core-avr ca-certificates curl python3 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://github.com/arduino-libraries/Servo/archive/refs/tags/1.2.2.tar.gz | tar -xz -C /opt && mv /opt/Servo-1.2.2 /opt/Servo
COPY build-core.py /opt/build-core.py
COPY distance.cpp /opt/distance.cpp
RUN python3 /opt/build-core.py
COPY compile.py /opt/compile.py
RUN mkdir -p /work && chmod 1777 /work
WORKDIR /work
ENTRYPOINT ["python3", "/opt/compile.py"]
