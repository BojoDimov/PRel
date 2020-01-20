#include <iostream>
#include <chrono>
#include <ctime>
#include <cstdlib>
#include <Windows.h>

int main() {
	auto end = std::chrono::system_clock::now();
	std::time_t end_time = std::chrono::system_clock::to_time_t(end);

	std::cout << "Starting program at " << std::ctime(&end_time)<<"\n";

	int counter = 0;
	while (true) {
		Sleep(1000);
		end = std::chrono::system_clock::now();
		end_time = std::chrono::system_clock::to_time_t(end);
		std::cout << std::ctime(&end_time) << "Log entry: " << ++counter << "\n\n";

		if (counter % 10 == 0)
			std::cerr << "EXCEPTION: unable to open file descriptor "<< new int << "\n\n";
	}
}